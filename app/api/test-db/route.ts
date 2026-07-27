import { NextResponse } from "next/server";
import net from "node:net";

export async function GET() {
  return new Promise((resolve) => {
    const socket = net.createConnection(
      {
        host: "159.143.58.33",
        port: 27017,
      },
      () => {
        socket.destroy();

        resolve(
          NextResponse.json({
            success: true,
            message: "Connected successfully",
          })
        );
      }
    );

    socket.on("error", (err) => {
      resolve(
        NextResponse.json({
          success: false,
          message: err.message,
        })
      );
    });
  });
}