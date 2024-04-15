import { Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import styles from "@/public/css/all.css/style.css";

function Home() {
  return (
    <div>
      <section
        id={styles.hero}
        className={`${styles.bgWhite} ${styles.textDark} ${styles.textCenter} ${styles.textSmEnd} ${styles.p5}`}
      >
        <div
          className={`${styles.dSmFlex} ${styles.flexRowReverse} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}
        >
          <div>
            <h1>
              مع <span className={styles.textSuccess}>إصلاح</span>{" "}
            </h1>
            <h1 className={styles.py3}>
              نسعى إلى تكوين مجتمع حيوي يتميز بمشاركة مدنية فاعلة على نطاق واسع.{" "}
            </h1>
            <p className={`${styles.p2} ${styles.lead}`}>
              يمكنكم الان رفع تقاريركم حول مشاكل تخص الأماكن العمومية ، و متابعة
              حلها مع الجهات المعنية
            </p>
            <button className={`btn btn-success`}>انضم إلينا الأن </button>
          </div>
          <div>
            <Image
              src="/assets/imgs/homepagepic2.svg"
              className={`${styles.imgFluid} ${styles.w100} ${styles.dNone} ${styles.dSmBlock}`}
              alt=""
              width={20}
              height={20}
            />
          </div>
        </div>
      </section>

      <div className={styles.cards}>
        <div className={styles.textCenter}>
          <h1 className={styles.py3}>خدماتنا</h1>
          <p className={`${styles.p2}`}>
            كيف تساهم منصة إصلاح في حل مشاكل المجتمع
          </p>
        </div>
      </div>

      <section className={`${styles.py5} ${styles.textCenter}`}>
        <div className={styles.container}>
          <div className={`${styles.row} ${styles.textCenter} ${styles.gy3}`}>
            <div
              className={`${styles.colSm4} ${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter}`}
            >
              <div className={`${styles.card} ${styles.h100} ${styles.w100}`}>
                <Image
                  src="/assets/imgs/people.svg"
                  className={styles.cardImgTop}
                  alt="..."
                  width={20}
                  height={20}
                />
                <div className={styles.cardBody}>
                  <p className={styles.cardText}>المشاركة المجتمعية</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles.colSm4} ${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter}`}
            >
              <div className={`${styles.card} ${styles.h100} ${styles.w100}`}>
                <Image
                  src="/assets/imgs/solve2.svg"
                  className={styles.cardImgTop}
                  alt="..."
                  width={20}
                  height={20}
                />
                <div className={styles.cardBody}>
                  <p className={styles.cardText}>متابعة حل المشاكل</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles.colSm4} ${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter}`}
            >
              <div className={`${styles.card} ${styles.h100} ${styles.w100}`}>
                <Image
                  src="/assets/imgs/report2.svg"
                  className={styles.cardImgTop}
                  alt="..."
                  width={20}
                  height={20}
                />
                <div className={styles.cardBody}>
                  <p className={styles.cardText}>الإبلاغ عن المشاكل</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.p5}></div>
      <div className={styles.p5}></div>
      <div className="">
        <h1
          className={`${styles.p} ${styles.textSuccess} ${styles.textCenter}`}
          style={{
            fontSize: "30px",
            fontFamily: "'IBM Plex Sans Arabic'",
            fontWeight: 500,
          }}
        >
          {" "}
          هذا العمل بمساعدة
        </h1>
      </div>
      <div
        className={`${styles.p5} ${styles.row} ${styles.justifyContentCenter}`}
      >
        <div
          id={styles.carouselExampleDark}
          className={`${styles.carousel} ${styles.carouselDark} ${styles.slide} ${styles.p5}`}
        >
          <div className={styles.carouselIndicators}>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className={styles.active}
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="3"
              aria-label="Slide 0"
            ></button>
          </div>
          <div className={styles.carouselInner}>
            <div
              className={`${styles.carouselItem} ${styles.active}`}
              data-bs-interval="10000"
            >
              <Image
                src="/public/imgs/sponsors/sonalgaz.svg"
                className={`${styles.dBlock} ${styles.mxAuto} ${styles.carouselImg}`}
                alt="Sonalgaz"
                width={100}
                height={100}
              />
              <div className={styles.carouselCaption}></div>
            </div>
            <div className={styles.carouselItem} data-bs-interval="2000">
              <Image
                src="/assets/imgs/sponsors/ade.svg"
                className={`${styles.dBlock} ${styles.mxAuto} ${styles.carouselImg}`}
                alt="ADE"
                width={100}
                height={100}
              />
              <div className={styles.carouselCaption}></div>
            </div>
            <div className={styles.carouselItem} data-bs-interval="2000">
              <Image
                src="/imgs/sponsors/ona.svg"
                className={`${styles.dBlock} ${styles.mxAuto} ${styles.carouselImg}`}
                alt="ONA-dz"
                width={150}
                height={150}
              />
              <div className={styles.carouselCaption}></div>
            </div>
            <div className={styles.carouselItem}>
              <Image
                src="/assets/imgs/sponsors/algerie-tele.svg"
                className={`${styles.dBlock} ${styles.mxAuto} ${styles.carouselImg}`}
                alt="ALGERIE TELECOM"
                width={180}
                height={180}
              />
              <div className={styles.carouselCaption}></div>
            </div>
          </div>
          <button
            className={styles.carouselControlPrev}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className={styles.carouselControlPrevIcon}
              aria-hidden="true"
            ></span>
            <span className={styles.visuallyHidden}>Previous</span>
          </button>
          <button
            className={styles.carouselControlNext}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className={styles.carouselControlNextIcon}
              aria-hidden="true"
            ></span>
            <span className={styles.visuallyHidden}>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
