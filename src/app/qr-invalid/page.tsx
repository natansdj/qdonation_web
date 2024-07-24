import Head from "next/head";
import Image from "next/image";
import React from "react";

import images from '@/configs/images';

const QrInvalidPage = () => {
  return (
    <>
      <Head>
        <title>QR Invalid</title>
        <meta name="description" content="QR Invalid" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="flex flex-col justify-center gap-6 w-full h-screen p-6">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <Image
            className="max-w-1/2 sm:max-w-1/3"
            src={images.qrNotFound}
            alt=""
          />
          <h6 className="heading-6 mt-4 !text-basicDark">
            QR Code Tidak Ditemukan
          </h6>
          <p className="p-medium text-[15px] !text-neutralDark font-Satoshi text-center">
            Gagal memuat QR code,
          </p>
        </div>

        {/* <button className="button-medium !text-white bg-errorNormal py-[14px] w-full rounded">
          Coba Lagi
        </button> */}
      </div>
    </>
  );
};

export default QrInvalidPage;