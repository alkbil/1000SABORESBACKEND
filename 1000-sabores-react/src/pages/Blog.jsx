// Blog.jsx - Página de Blog completa
import React from 'react';

const Blog = () => {
  const articulos = [
    {
      id: 1,
      titulo: "El Arte del Chocolate: Técnicas y Secretos",
      descripcion: "Descubre los secretos para trabajar con chocolate de manera profesional. Desde el temperado hasta la creación de figuras decorativas...",
      imagen: "/img/blog-postres-chocolate.jpg",
      fecha: "15 Mayo 2023"
    },
    {
      id: 2,
      titulo: "Técnicas Modernas de Decoración de Pasteles",
      descripcion: "Las tendencias en decoración de pasteles evolucionan constantemente. Te mostramos las técnicas que están dominando la repostería artística...",
      imagen: "/img/blog-decoracion.jpg",
      fecha: "22 Mayo 2023"
    },
    {
      id: 3,
      titulo: "Ingredientes Premium: ¿Realmente Marcan la Diferencia?",
      descripcion: "Analizamos cómo la calidad de los ingredientes afecta el sabor y textura de tus postres. Te ayudamos a elegir los mejores productos...",
      imagen: "/img/blog-ingredientes.jpg",
      fecha: "30 Mayo 2023"
    },
    {
      id: 4,
      titulo: "Postres de Temporada: Verano 2023",
      descripcion: "Los sabores frutales y postres refrescantes dominan esta temporada. Conoce nuestras nuevas creaciones inspiradas en los frutos del verano...",
      imagen: "/img/blog-temporada.webp",
      fecha: "5 Junio 2023"
    },
    {
      id: 5,
      titulo: "La Historia Detrás del Cheesecake",
      descripcion: "¿Sabías que el cheesecake tiene sus raíces en la antigua Grecia? Te contamos la fascinante historia de uno de los postres más populares...",
      imagen: "/img/blog-historia.png",
      fecha: "12 Junio 2023"
    },
    {
      id: 6,
      titulo: "Tendencias 2023: Lo que Viene en Repostería",
      descripcion: "Sabores exóticos, técnicas innovadoras y presentaciones audaces. Descubre lo que marcará tendencia en el mundo de la repostería este año...",
      imagen: "/img/blog-tendencias.webp",
      fecha: "18 Junio 2023"
    }
  ];

  const blogsRecomendados = [
    {
      nombre: "Directo al Paladar",
      descripcion: "Uno de los blogs de gastronomía más populares en español, con excelente contenido sobre repostería.",
      url: "https://www.directoalpaladar.com"
    },
    {
      nombre: "De Repostería",
      descripcion: "Un blog especializado en recetas de repostería con tutoriales detallados y consejos prácticos.",
      url: "https://dereposteria.com"
    },
    {
      nombre: "Repostería Casera",
      descripcion: "Un espacio dedicado a la repostería casera con recetas tradicionales y técnicas básicas.",
      url: "https://reposteriacasera.com"
    },
    {
      nombre: "Bake Street",
      descripcion: "Un blog con recetas modernas de repostería y panadería, con un enfoque creativo e innovador.",
      url: "https://bake-street.com"
    },
    {
      nombre: "Con Mucha Gula",
      descripcion: "Blog de recetas dulces y saladas con un apartado especial de repostería creativa.",
      url: "https://www.conmuchagula.com"
    },
    {
      nombre: "Sweet & Sour",
      descripcion: "Un blog que combina recetas tradicionales con técnicas modernas de repostería.",
      url: "https://sweetandsour.es"
    }
  ];

  return (
    <div className="blog-page">
      {/* Hero Section para Blogs */}
      <section className="hero-blogs">
        <div className="container">
          <div className="hero-text">
            <h1>NUESTRO BLOG DE REPOSTERÍA</h1>
            <p>
              Descubre consejos, recetas exclusivas y las historias detrás de nuestros deliciosos postres. 
              Endulza tu conocimiento con nuestro contenido especializado.
            </p>
            <a href="#blogs" className="btn">📖 Leer artículos</a>
          </div>
          <div className="hero-img">
            <img src="/img/blog-banner.jpeg" alt="Blog de repostería 1000 Sabores" />
          </div>
        </div>
      </section>

      {/* Sección de Blogs */}
      <main id="blogs">
        <div className="container">
          <h2 className="section-title">Artículos Recientes</h2>
          
          <div className="blog-grid">
            {articulos.map(articulo => (
              <article key={articulo.id} className="blog-card">
                <div className="blog-img">
                  <img src={articulo.imagen} alt={articulo.titulo} />
                </div>
                <div className="blog-content">
                  <h3>{articulo.titulo}</h3>
                  <p>{articulo.descripcion}</p>
                  <div className="blog-meta">
                    <button className="read-more" onClick={() => alert('Funcionalidad de lectura completa próximamente')}>
                      Leer más →
                    </button>
                    <span className="blog-date">{articulo.fecha}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Sección de Blogs Recomendados */}
      <section className="recommended-blogs">
        <div className="container">
          <h2 className="section-title">Blogs de Repostería Recomendados</h2>
          <p>Descubre otros blogs especializados en repostería que te inspirarán con nuevas ideas y técnicas.</p>
          
          <div className="blog-list">
            {blogsRecomendados.map((blog, index) => (
              <div key={index} className="external-blog">
                <h3>{blog.nombre}</h3>
                <p>{blog.descripcion}</p>
                <a href={blog.url} target="_blank" rel="noopener noreferrer">Visitar blog →</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;