"use client";

import Image from "next/image";
import { useContext } from "react";
import styles from "./page.module.css";
import Balance from "../Component/Balance";
import RecentHistory from "../Component/RecentHistory";

import Header from "../Component/Header";

export default function Home() {
  return (
    <div className={styles.Container}>
      <div className={styles.head}>
        <Header />
      </div>
      <div className={styles.main}>
        <Balance />
        <RecentHistory />
      </div>
    </div>
  );
}
