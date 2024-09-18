interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  return <>{children}</>;
}
