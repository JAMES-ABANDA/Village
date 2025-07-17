// Initialisation Supabase
const supabaseUrl = "https://mxopzpqxocschvbfhhnv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b3B6cHF4b2NzY2h2YmZoaG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NDIwMDcsImV4cCI6MjA2ODMxODAwN30.bDez809FjjM6UBQTFzfIo6t4S6RVM2AfC1EUBs-V01s";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Chargement dynamique des partials
const loadHTML = (id, url) => {
  fetch(url)
    .then((res) => res.text())
    .then((html) => (document.getElementById(id).innerHTML = html))
    .catch((err) => console.error(`Erreur chargement ${url}:`, err));
};
["header", "hero", "features", "footer"].forEach((section) => {
  loadHTML(section, `components/${section}.html`);
});

// Si page de login
if (document.getElementById("login-form")) {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) return alert("Erreur : " + error.message);
      window.location.href = "/dashboard.html";
    });
}
