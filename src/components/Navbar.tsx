import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
            {user ? (
              <>
                <Link href="/api/auth/logout" className={buttonVariants({
                  // ghost를 통해 하얀색 설정
                  size: 'sm', variant: 'ghost'
                })}>
                  Sign out
                </Link>
                {isAdmin ? <Link href="/api/auth/logout" className={buttonVariants({
                  size: 'sm', variant: 'ghost'
                })}>
                  Dashboard ✨
                </Link> : null}
            ) : (
              <>
                <Link href="/api/auth/register" className={buttonVariants({
                  size: 'sm', variant: 'ghost'
                })}>
                  Sign up
                </Link>
                <Link href="/api/auth/login" className={buttonVariants({
                  size: 'sm',
                  variant: "ghost",
                })}>
                  Login
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>

