function message() {
  return (
    <main>
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginTop: "300px",
          textAlign: "center",
        }}
      >
        Thanks for visiting my portfolio!
      </h1>
      <h2
        style={{
          fontSize: "20px",
          textAlign: "center",
          color: "var(--muted-foreground)",
        }}
      >
        The website is under Development
      </h2>
      <h6
        style={{
          fontSize: "20px",
          textAlign: "center",
          color: "var(--accent)",
        }}
      >
        Best Regards, <br />
        <q>Hazem Al-Melli</q>
      </h6>
    </main>
  );
}
export default message;
