import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { readFile, unlink, mkdir, rm } from "fs/promises";
import { randomUUID } from "crypto";

const execAsync = promisify(exec);

export const maxDuration = 60; // 1 minute max

export async function GET() {
  const tmpDir = "/tmp/gudenko-downloads";
  const archiveId = randomUUID();
  const projectDir = `${tmpDir}/gudenko-fund-${archiveId}`;
  const archivePath = `${tmpDir}/gudenko-fund-${archiveId}.zip`;
  
  try {
    const projectRoot = process.cwd();
    
    // Create tmp directory
    try {
      await mkdir(tmpDir, { recursive: true });
    } catch {
      // Directory exists
    }
    
    // Create project directory for zip
    await mkdir(projectDir, { recursive: true });
    
    // Copy project files (excluding heavy directories)
    await execAsync(
      `rsync -a --exclude='node_modules' --exclude='.next' --exclude='tmp' --exclude='.git' ` +
      `--exclude='*.log' --exclude='*.db' --exclude='*.db-journal' ` +
      `"${projectRoot}/" "${projectDir}/"`,
      { maxBuffer: 1024 * 1024 * 100 }
    );
    
    // Create ZIP archive
    await execAsync(
      `cd "${tmpDir}" && zip -r -q "${archivePath}" "gudenko-fund-${archiveId}"`,
      { maxBuffer: 1024 * 1024 * 100 }
    );
    
    // Read the archive
    const archiveBuffer = await readFile(archivePath);
    
    // Clean up
    await rm(projectDir, { recursive: true, force: true }).catch(() => {});
    await unlink(archivePath).catch(() => {});
    
    // Return the archive
    return new NextResponse(archiveBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="gudenko-fund-project.zip"`,
        "Content-Length": archiveBuffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error("Error creating project archive:", error);
    
    // Clean up on error
    await rm(projectDir, { recursive: true, force: true }).catch(() => {});
    await unlink(archivePath).catch(() => {});
    
    return NextResponse.json(
      { error: "Failed to create project archive", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
