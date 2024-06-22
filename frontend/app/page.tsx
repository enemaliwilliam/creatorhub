import styles from "@/app/page.module.css";

export default async function Home() {
  return (
    <section className={styles.hero}>
      <h1 className="text-3xl font-bold underline">Scratchpad!</h1>
    </section>
  );
}
