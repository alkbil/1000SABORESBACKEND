// About.jsx - Página Nosotros completa
import React from 'react';

const About = () => {
  const equipoMiembros = [
    {
      nombre: "Mirza Rodríguez",
      rol: "Fundadora & Chef Repostera",
      descripcion: "Con más de 15 años de experiencia en repostería, Mirza es el alma creativa detrás de cada nueva receta.",
      imagen: "/img/maria.jpg"
    },
    {
      nombre: "Xavier Blanco",
      rol: "Pastelero Ejecutivo",
      descripcion: "Especializado en pastelería francesa, Xavier se encarga de mantener los estándares de calidad excepcionales.",
      imagen: "/img/carlos.jpg"
    },
    {
      nombre: "Cristobal Nuñez",
      rol: "Decoradora Principal",
      descripcion: "Artista con el buttercream, Cristobal transforma cada pastel en una obra de arte comestible.",
      imagen: "/img/elena.jpg"
    },
    {
      nombre: "Cristobal Alcavil",
      rol: "Gerente de Operaciones",
      descripcion: "Alcavil asegura que cada pedido llegue a tiempo y en perfectas condiciones a nuestros clientes.",
      imagen: "/img/javier.jpg"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section para Nosotros */}
      <section className="hero-blogs">
        <div className="container">
          <div className="hero-text">
            <h1>SOBRE NOSOTROS</h1>
            <p>
              Conoce la historia, misión y valores de 1000 Sabores, la repostería que endulza los momentos especiales 
              de tu vida con creaciones artesanales llenas de sabor y amor.
            </p>
          </div>
          <div className="hero-img">
            <img src="/img/nosotros-banner.webp" alt="Equipo de 1000 Sabores" />
          </div>
        </div>
      </section>

      {/* Sección de Historia */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Nuestra Historia</h2>
              <p>
                1000 Sabores nació en 1995 del sueño de Mirza Rodríguez, una apasionada repostera que comenzó 
                horneando para sus familiares y amigos. Lo que empezó como un hobby pronto se convirtió en un 
                negocio próspero gracias al boca a boca y la calidad de sus productos.
              </p>
              <p>
                Hoy, después de más de una década, seguimos manteniendo la esencia artesanal que nos caracteriza, 
                combinando técnicas tradicionales con innovadoras creaciones que sorprenden a nuestros clientes.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>13+</h3>
                  <p>Años de experiencia</p>
                </div>
                <div className="stat">
                  <h3>500+</h3>
                  <p>Clientes satisfechos</p>
                </div>
                <div className="stat">
                  <h3>50+</h3>
                  <p>Tipos de postres</p>
                </div>
              </div>
            </div>
            <div className="about-img">
              <img src="/img/historia.webp" alt="Historia de 1000 Sabores" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Misión y Visión */}
      <section className="mission-section">
        <div className="container">
          <h2 className="section-title">Nuestra Misión y Visión</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Misión</h3>
              <p>
                Endulzar los momentos especiales de las personas a través de postres artesanales de alta calidad, 
                elaborados con ingredientes frescos y técnicas que realzan los sabores tradicionales con un toque innovador.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Visión</h3>
              <p>
                Ser la repostería de referencia a nivel nacional, reconocida por nuestra creatividad, calidad excepcional 
                y compromiso con la satisfacción total de nuestros clientes, expandiendo nuestra presencia con locales propios.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💎</div>
              <h3>Valores</h3>
              <p>
                Calidad, creatividad, pasión por lo artesanal, innovación constante, compromiso con el cliente y 
                responsabilidad en cada proceso de elaboración de nuestros productos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección del Equipo */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="team-grid">
            {equipoMiembros.map((miembro, index) => (
              <div key={index} className="team-member">
                <img src={miembro.imagen} alt={miembro.nombre} />
                <h3>{miembro.nombre}</h3>
                <p className="role">{miembro.rol}</p>
                <p>{miembro.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>¿Quieres recibir nuestras novedades?</h2>
            <p>Suscríbete a nuestro newsletter y sé el primero en conocer nuevos sabores y promociones especiales.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Tu correo electrónico" required />
              <button type="submit" className="btn">Suscribirme</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;