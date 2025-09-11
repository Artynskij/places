export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to the homepage
      </a>
    </div>
  );
}
