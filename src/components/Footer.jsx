import '../styles/header-footer.css';

const copyRight = "/copyright.jpg";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={copyRight} alt="Logo" className="footer-logo" />
          <p>Rolsa Technologies. Powered by sustainable energy.</p>
        </div>
        <div className="footer-right">
          <p>FAQ</p>
          <p>Policy</p>
          <p>Legal</p>
        </div>
      </div>
    </footer>
  );
}
