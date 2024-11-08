import { prisma } from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { horarioDeInicio, horarioDeFim, dias, email } =  await request.json();

  if (dias) {
    try {
      dias.forEach(async (dia: string) => {
        await prisma.availableTime.create({
          data: {
            day: dia,
            startTime: horarioDeInicio,
            endTime: horarioDeFim,
            user: {
              connect: {
                email
              }
            }
          }
        });
      });

      return NextResponse.json({ msg: '' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ msg: '' }, { status: 500 });
    }
  }

  return NextResponse.json({ msg: '' }, { status: 400 });
}