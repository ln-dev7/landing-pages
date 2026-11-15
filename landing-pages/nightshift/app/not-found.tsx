export default function NotFound() {
  return (
    <main className="lost">
      <p>$ cat this-page</p>
      <h1>404: NO SUCH FILE</h1>
      <a className="button" href="/">
        &gt; cd ~
      </a>
    </main>
  );
}
