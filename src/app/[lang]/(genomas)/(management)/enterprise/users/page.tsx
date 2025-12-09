export default function UsersPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to info page with users tab
    const basePath = pathname.replace("/users", "");
    router.replace(`${basePath}/info`);
  }, [pathname, router]);

  return null;
}
