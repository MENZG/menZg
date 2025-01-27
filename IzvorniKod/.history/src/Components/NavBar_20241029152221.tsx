const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img src="/src/public/MenZg.png" alt="logo slika"></img>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Menze
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Moji favoriti
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Profil
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
