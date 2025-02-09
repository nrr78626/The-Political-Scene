import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request:NextRequest){
    const token = await getToken({req:request})

    if(!token){
      return NextResponse.redirect(new URL("/sign-in",request.url))
    }

    if(token.role == "User"){
      return NextResponse.redirect(new URL("/",request.url))
    }
}

export const config = {
    matcher: '/dashboard/:path*',
  }