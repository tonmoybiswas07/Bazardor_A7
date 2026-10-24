import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
const session = await auth.api.getSession({
    headers:await headers()
})

const users = session?.user
if(!users){
return NextResponse.redirect(new URL('/Auth/SignIn', request.url))
}



  
}

export const config = {
  matcher: ["/profile","/ProductsDetails/:path"],
}