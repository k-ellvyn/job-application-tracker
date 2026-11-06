import { connectDB } from "./db";
import { prisma } from "./prisma";
import { ApplicationStatus } from "@prisma/client";

const DEFAULT_COLUMNS: { name: string; order: number }[] = [];

for (const [_, status] of Object.entries(ApplicationStatus)) {
    DEFAULT_COLUMNS.push({
        name: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
        order: DEFAULT_COLUMNS.length
    });
}

export async function initializeDefaultBoard(userId: string) {
    try {
        await connectDB();
        
        const existingBoard = await prisma.board.findFirst({
            where: {
                userId,
                name: "Default" 
            }
        });

        if (existingBoard) {
            return existingBoard;
        }

        const newBoard = await prisma.board.create({
            data: {
                name: "Default",
                userId,
            }
        });

        await prisma.column.createMany({
            data: DEFAULT_COLUMNS.map((column) => ({
                ...column,
                boardId: newBoard.id,
            }))
        });
    } catch (err) {
        throw err;
    }
}