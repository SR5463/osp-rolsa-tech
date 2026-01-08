import '../styles/header-footer.css';

const imgLogo = "https://media.licdn.com/dms/image/v2/D4E22AQETKT7iZjy3IA/feedshare-shrink_480/B4EZYmk0rpHUAc-/0/1744403910438?e=2147483647&v=beta&t=GoVDcHp2erQko-VJ7j7ePdSGIza8VVN2LMHsNEILAdk";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={imgLogo} alt="Logo" className="footer-logo" />
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
