

const Footer = () => {
  return (
    <div className=" font-page" data-theme='night'>


      <footer className="footer bg-base-200 justify-center tab:justify-normal   des:text-base text-base-content pt-32 pb-44 tab:pl-20 lap:pl-32 des:pl-44" >
        <aside>
          <img className="w-28 -mt-12 -ml-6" src="https://i.ibb.co.com/84VQ3Vs/Logo-5.webp" alt="" />
          <p className="">
            FurFriendz
            <br /><br />
            Pixelopers Solutions ltd.
          </p>
        </aside>
        <nav className="">
          <h6 className="footer-title">Products</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Delivery</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">Contact Us</a>
          <a href="https://www.linkedin.com/in/redwan-hasan-rahat-109812319/" className="link link-hover">Linkedin</a>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Whatsapp</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>


      </footer>
      <div className="text-center pb-12 w-full">
        <p className="text-center text-sm mb-2">
          © 2024–2026 FurFriendz. All rights reserved.
        </p>

        <a
          className="text-center underline text-sm"
          href="https://redwanrahat.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed & Developed by Md. Redwan Hasan Rahat
        </a>
      </div>
    </div>
  );
};

export default Footer;