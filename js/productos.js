// Sección "Nuestros productos": trae en vivo el catálogo publicado en la tienda
// (mismo origen de datos que turnos.nivebeauty.com.ar/tienda) usando la clave
// pública (anon) de Supabase, protegida por RLS del lado del servidor.
(function () {
  var SUPABASE_URL = "https://psvigvvcfvdaqjbvriqq.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzdmlndnZjZnZkYXFqYnZyaXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNTc2NTMsImV4cCI6MjA5ODgzMzY1M30.TQwf7Um1VxhayQuFyXfJVesp1KRTIiDl5nhkPj8Ha4k";
  var TIENDA_URL = "https://turnos.nivebeauty.com.ar/tienda";

  var grid = document.getElementById("productosGrid");
  if (!grid) return;
  var empty = document.getElementById("productosEmpty");

  var modal = document.getElementById("productoModal");
  var modalImg = document.getElementById("productoModalImg");
  var modalCat = document.getElementById("productoModalCat");
  var modalName = document.getElementById("productoModalName");
  var modalPrice = document.getElementById("productoModalPrice");
  var modalDesc = document.getElementById("productoModalDesc");
  var modalLink = document.getElementById("productoModalLink");

  function money(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function openModal(p) {
    modalImg.src = p.image || "";
    modalImg.alt = p.name;
    modalCat.textContent = p.category || "";
    modalName.textContent = p.name;
    modalPrice.textContent = money(p.price);
    modalDesc.textContent = p.description || "";
    modalLink.href = TIENDA_URL + "/" + p.id;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  var closeBtn = document.getElementById("productoModalClose");
  var overlay = document.getElementById("productoModalOverlay");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  var query =
    SUPABASE_URL +
    "/rest/v1/products?select=id,name,description,category,retail_price,product_images(url,sort_order)" +
    "&shop_published=eq.true&is_active=eq.true&order=category.asc,name.asc";

  fetch(query, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: "Bearer " + SUPABASE_ANON_KEY,
    },
  })
    .then(function (r) { return r.json(); })
    .then(function (rows) {
      if (!Array.isArray(rows) || rows.length === 0) {
        if (empty) empty.style.display = "block";
        return;
      }
      var products = rows.map(function (p) {
        var images = (p.product_images || []).slice().sort(function (a, b) {
          return a.sort_order - b.sort_order;
        });
        return {
          id: p.id,
          name: p.name,
          description: p.description,
          category: p.category,
          price: Number(p.retail_price || 0),
          image: images.length ? images[0].url : null,
        };
      });

      grid.innerHTML = "";
      products.forEach(function (p) {
        var card = document.createElement("button");
        card.type = "button";
        card.className = "producto-card";
        card.setAttribute("aria-label", "Ver " + p.name);

        var imgWrap = document.createElement("div");
        imgWrap.className = "producto-card__img";
        if (p.image) {
          var img = document.createElement("img");
          img.src = p.image;
          img.alt = p.name;
          img.loading = "lazy";
          imgWrap.appendChild(img);
        }

        var info = document.createElement("div");
        info.className = "producto-card__info";
        var name = document.createElement("div");
        name.className = "producto-card__name";
        name.textContent = p.name;
        var price = document.createElement("div");
        price.className = "producto-card__price";
        price.textContent = money(p.price);
        info.appendChild(name);
        info.appendChild(price);

        card.appendChild(imgWrap);
        card.appendChild(info);
        card.addEventListener("click", function () { openModal(p); });
        grid.appendChild(card);
      });
    })
    .catch(function () {
      if (empty) empty.style.display = "block";
    });
})();
