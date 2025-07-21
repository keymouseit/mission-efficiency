import Script from "next/script";

const MailChimp = async () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={
          "https://chimpstatic.com/mcjs-connected/js/users/7538fc5f6603b063a8158282f/80918e165a233a4539974890b.js"
        }
      />
      <Script
        id="mcjs"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `function (c, h, i, m, p) {
						(m = c.createElement(h)),
						  (p = c.getElementsByTagName(h)[0]),
						  (m.async = 1),
						  (m.src = i),
						  p.parentNode.insertBefore(m, p);
					  }`,
        }}
      />
    </>
  );
};

export default MailChimp;
