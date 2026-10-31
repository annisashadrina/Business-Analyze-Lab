/**
 * Business Analysis Learning Lab - Central Data Loader
 * Provides dataset parsing, remote fetch, and embedded offline fallbacks
 */

const DataLoader = (() => {
  // Embedded fallback datasets to ensure 100% offline & file:// protocol operation
  const embeddedData = {
    coffeeSales: [
      { hari: "Senin_M1", biaya_iklan_ribu: 20, pengunjung: 45, promo_aktif: "Tidak", produk_terjual: 30, pendapatan_ribu: 750 },
      { hari: "Selasa_M1", biaya_iklan_ribu: 30, pengunjung: 58, promo_aktif: "Ya", produk_terjual: 40, pendapatan_ribu: 1000 },
      { hari: "Rabu_M1", biaya_iklan_ribu: 10, pengunjung: 28, promo_aktif: "Tidak", produk_terjual: 20, pendapatan_ribu: 500 },
      { hari: "Kamis_M1", biaya_iklan_ribu: 40, pengunjung: 72, promo_aktif: "Ya", produk_terjual: 55, pendapatan_ribu: 1375 },
      { hari: "Jumat_M1", biaya_iklan_ribu: 50, pengunjung: 85, promo_aktif: "Ya", produk_terjual: 60, pendapatan_ribu: 1500 },
      { hari: "Sabtu_M1", biaya_iklan_ribu: 65, pengunjung: 110, promo_aktif: "Ya", produk_terjual: 75, pendapatan_ribu: 1875 },
      { hari: "Minggu_M1", biaya_iklan_ribu: 55, pengunjung: 95, promo_aktif: "Ya", produk_terjual: 68, pendapatan_ribu: 1700 },
      { hari: "Senin_M2", biaya_iklan_ribu: 25, pengunjung: 50, promo_aktif: "Tidak", produk_terjual: 35, pendapatan_ribu: 875 },
      { hari: "Selasa_M2", biaya_iklan_ribu: 35, pengunjung: 65, promo_aktif: "Ya", produk_terjual: 45, pendapatan_ribu: 1125 },
      { hari: "Rabu_M2", biaya_iklan_ribu: 15, pengunjung: 35, promo_aktif: "Tidak", produk_terjual: 25, pendapatan_ribu: 625 },
      { hari: "Kamis_M2", biaya_iklan_ribu: 45, pengunjung: 80, promo_aktif: "Ya", produk_terjual: 58, pendapatan_ribu: 1450 },
      { hari: "Jumat_M2", biaya_iklan_ribu: 55, pengunjung: 90, promo_aktif: "Ya", produk_terjual: 65, pendapatan_ribu: 1625 },
      { hari: "Sabtu_M2", biaya_iklan_ribu: 70, pengunjung: 120, promo_aktif: "Ya", produk_terjual: 82, pendapatan_ribu: 2050 },
      { hari: "Minggu_M2", biaya_iklan_ribu: 60, pengunjung: 105, promo_aktif: "Ya", produk_terjual: 72, pendapatan_ribu: 1800 }
    ],

    dirtyCoffeeData: [
      { id_transaksi: "TRX-101", tanggal: "2026-10-01", cabang: "Surabaya", biaya_iklan_ribu: 20, pengunjung: 45, produk_terjual: 30, status_promo: "Tidak" },
      { id_transaksi: "TRX-102", tanggal: "2026-10-02", cabang: "surabaya", biaya_iklan_ribu: 30, pengunjung: 58, produk_terjual: 40, status_promo: "Ya" },
      { id_transaksi: "TRX-103", tanggal: "2026-10-03", cabang: "SURABAYA", biaya_iklan_ribu: 10, pengunjung: 28, produk_terjual: 20, status_promo: "Tidak" },
      { id_transaksi: "TRX-103", tanggal: "2026-10-03", cabang: "SURABAYA", biaya_iklan_ribu: 10, pengunjung: 28, produk_terjual: 20, status_promo: "Tidak" },
      { id_transaksi: "TRX-104", tanggal: "2026-10-04", cabang: "Surabaya", biaya_iklan_ribu: null, pengunjung: 72, produk_terjual: 55, status_promo: "Ya" },
      { id_transaksi: "TRX-105", tanggal: "2026-10-05", cabang: "Surabaya", biaya_iklan_ribu: 50, pengunjung: 9999, produk_terjual: -10, status_promo: "Ya" },
      { id_transaksi: "TRX-106", tanggal: "2026-10-06", cabang: "Malang", biaya_iklan_ribu: 65, pengunjung: 110, produk_terjual: 75, status_promo: "Ya" },
      { id_transaksi: "TRX-107", tanggal: "2026-10-07", cabang: "malang", biaya_iklan_ribu: 55, pengunjung: 95, produk_terjual: 68, status_promo: "Ya" },
      { id_transaksi: "TRX-108", tanggal: "2026-10-08", cabang: "Surabaya", biaya_iklan_ribu: 25, pengunjung: 50, produk_terjual: 35, status_promo: "Tidak" },
      { id_transaksi: "TRX-109", tanggal: "2026-10-09", cabang: "Malang", biaya_iklan_ribu: 35, pengunjung: 62, produk_terjual: 44, status_promo: "Ya" }
    ],

    customerChurn: [
      { customer_id: "CUST-001", lama_langganan_bulan: 14, frekuensi_pesan_per_bulan: 8, komplain_terakhir: "Tidak", pengeluaran_ribu: 320, churn: "Tidak" },
      { customer_id: "CUST-002", lama_langganan_bulan: 2, frekuensi_pesan_per_bulan: 1, komplain_terakhir: "Ya", pengeluaran_ribu: 65, churn: "Ya" },
      { customer_id: "CUST-003", lama_langganan_bulan: 18, frekuensi_pesan_per_bulan: 12, komplain_terakhir: "Tidak", pengeluaran_ribu: 480, churn: "Tidak" },
      { customer_id: "CUST-004", lama_langganan_bulan: 3, frekuensi_pesan_per_bulan: 2, komplain_terakhir: "Ya", pengeluaran_ribu: 90, churn: "Ya" },
      { customer_id: "CUST-005", lama_langganan_bulan: 9, frekuensi_pesan_per_bulan: 6, komplain_terakhir: "Tidak", pengeluaran_ribu: 240, churn: "Tidak" },
      { customer_id: "CUST-006", lama_langganan_bulan: 1, frekuensi_pesan_per_bulan: 1, komplain_terakhir: "Ya", pengeluaran_ribu: 45, churn: "Ya" },
      { customer_id: "CUST-007", lama_langganan_bulan: 24, frekuensi_pesan_per_bulan: 15, komplain_terakhir: "Tidak", pengeluaran_ribu: 620, churn: "Tidak" },
      { customer_id: "CUST-008", lama_langganan_bulan: 4, frekuensi_pesan_per_bulan: 2, komplain_terakhir: "Tidak", pengeluaran_ribu: 110, churn: "Ya" },
      { customer_id: "CUST-009", lama_langganan_bulan: 12, frekuensi_pesan_per_bulan: 7, komplain_terakhir: "Tidak", pengeluaran_ribu: 290, churn: "Tidak" },
      { customer_id: "CUST-010", lama_langganan_bulan: 5, frekuensi_pesan_per_bulan: 3, komplain_terakhir: "Ya", pengeluaran_ribu: 130, churn: "Ya" },
      { customer_id: "CUST-011", lama_langganan_bulan: 16, frekuensi_pesan_per_bulan: 10, komplain_terakhir: "Tidak", pengeluaran_ribu: 410, churn: "Tidak" },
      { customer_id: "CUST-012", lama_langganan_bulan: 2, frekuensi_pesan_per_bulan: 1, komplain_terakhir: "Tidak", pengeluaran_ribu: 50, churn: "Ya" },
      { customer_id: "CUST-013", lama_langganan_bulan: 8, frekuensi_pesan_per_bulan: 5, komplain_terakhir: "Tidak", pengeluaran_ribu: 210, churn: "Tidak" },
      { customer_id: "CUST-014", lama_langganan_bulan: 3, frekuensi_pesan_per_bulan: 2, komplain_terakhir: "Ya", pengeluaran_ribu: 85, churn: "Ya" },
      { customer_id: "CUST-015", lama_langganan_bulan: 20, frekuensi_pesan_per_bulan: 11, komplain_terakhir: "Tidak", pengeluaran_ribu: 460, churn: "Tidak" },
      { customer_id: "CUST-016", lama_langganan_bulan: 6, frekuensi_pesan_per_bulan: 4, komplain_terakhir: "Tidak", pengeluaran_ribu: 170, churn: "Tidak" }
    ],

    customerClustering: [
      { customer_id: "C-01", frekuensi_kunjungan_bulan: 18, rata_rata_belanja_ribu: 125, profil_faktual: "VIP Loyal" },
      { customer_id: "C-02", frekuensi_kunjungan_bulan: 20, rata_rata_belanja_ribu: 140, profil_faktual: "VIP Loyal" },
      { customer_id: "C-03", frekuensi_kunjungan_bulan: 16, rata_rata_belanja_ribu: 110, profil_faktual: "VIP Loyal" },
      { customer_id: "C-04", frekuensi_kunjungan_bulan: 19, rata_rata_belanja_ribu: 150, profil_faktual: "VIP Loyal" },
      { customer_id: "C-05", frekuensi_kunjungan_bulan: 17, rata_rata_belanja_ribu: 130, profil_faktual: "VIP Loyal" },
      { customer_id: "C-06", frekuensi_kunjungan_bulan: 15, rata_rata_belanja_ribu: 115, profil_faktual: "VIP Loyal" },
      { customer_id: "C-07", frekuensi_kunjungan_bulan: 14, rata_rata_belanja_ribu: 35, profil_faktual: "WFC Hemat" },
      { customer_id: "C-08", frekuensi_kunjungan_bulan: 16, rata_rata_belanja_ribu: 40, profil_faktual: "WFC Hemat" },
      { customer_id: "C-09", frekuensi_kunjungan_bulan: 12, rata_rata_belanja_ribu: 30, profil_faktual: "WFC Hemat" },
      { customer_id: "C-10", frekuensi_kunjungan_bulan: 18, rata_rata_belanja_ribu: 45, profil_faktual: "WFC Hemat" },
      { customer_id: "C-11", frekuensi_kunjungan_bulan: 15, rata_rata_belanja_ribu: 38, profil_faktual: "WFC Hemat" },
      { customer_id: "C-12", frekuensi_kunjungan_bulan: 13, rata_rata_belanja_ribu: 32, profil_faktual: "WFC Hemat" },
      { customer_id: "C-13", frekuensi_kunjungan_bulan: 2, rata_rata_belanja_ribu: 25, profil_faktual: "Pengunjung Kasual" },
      { customer_id: "C-14", frekuensi_kunjungan_bulan: 3, rata_rata_belanja_ribu: 30, profil_faktual: "Pengunjung Kasual" },
      { customer_id: "C-15", frekuensi_kunjungan_bulan: 1, rata_rata_belanja_ribu: 20, profil_faktual: "Pengunjung Kasual" },
      { customer_id: "C-16", frekuensi_kunjungan_bulan: 4, rata_rata_belanja_ribu: 35, profil_faktual: "Pengunjung Kasual" },
      { customer_id: "C-17", frekuensi_kunjungan_bulan: 2, rata_rata_belanja_ribu: 28, profil_faktual: "Pengunjung Kasual" },
      { customer_id: "C-18", frekuensi_kunjungan_bulan: 3, rata_rata_belanja_ribu: 22, profil_faktual: "Pengunjung Kasual" },
      { customer_id: "C-19", frekuensi_kunjungan_bulan: 3, rata_rata_belanja_ribu: 180, profil_faktual: "Pembeli Acara" },
      { customer_id: "C-20", frekuensi_kunjungan_bulan: 2, rata_rata_belanja_ribu: 220, profil_faktual: "Pembeli Acara" },
      { customer_id: "C-21", frekuensi_kunjungan_bulan: 4, rata_rata_belanja_ribu: 195, profil_faktual: "Pembeli Acara" },
      { customer_id: "C-22", frekuensi_kunjungan_bulan: 2, rata_rata_belanja_ribu: 160, profil_faktual: "Pembeli Acara" },
      { customer_id: "C-23", frekuensi_kunjungan_bulan: 3, rata_rata_belanja_ribu: 210, profil_faktual: "Pembeli Acara" },
      { customer_id: "C-24", frekuensi_kunjungan_bulan: 4, rata_rata_belanja_ribu: 175, profil_faktual: "Pembeli Acara" }
    ],

    transactions: [
      { transaction_id: "TRX-001", items: ["Kopi Susu Senja", "Croissant Mentega"] },
      { transaction_id: "TRX-002", items: ["Kopi Susu Senja", "Roti Bakar Cokelat", "Air Mineral"] },
      { transaction_id: "TRX-003", items: ["Americano Dingin", "Croissant Mentega"] },
      { transaction_id: "TRX-004", items: ["Kopi Susu Senja", "Croissant Mentega", "Donat Gula"] },
      { transaction_id: "TRX-005", items: ["Espresso Single", "Air Mineral"] },
      { transaction_id: "TRX-006", items: ["Kopi Susu Senja", "Croissant Mentega"] },
      { transaction_id: "TRX-007", items: ["Americano Dingin", "Roti Bakar Cokelat"] },
      { transaction_id: "TRX-008", items: ["Kopi Susu Senja", "Donat Gula"] },
      { transaction_id: "TRX-009", items: ["Kopi Susu Senja", "Croissant Mentega", "Roti Bakar Cokelat"] },
      { transaction_id: "TRX-010", items: ["Espresso Single", "Croissant Mentega"] },
      { transaction_id: "TRX-011", items: ["Kopi Susu Senja", "Croissant Mentega"] },
      { transaction_id: "TRX-012", items: ["Americano Dingin", "Air Mineral"] },
      { transaction_id: "TRX-013", items: ["Kopi Susu Senja", "Roti Bakar Cokelat"] },
      { transaction_id: "TRX-014", items: ["Kopi Susu Senja", "Croissant Mentega", "Air Mineral"] },
      { transaction_id: "TRX-015", items: ["Donat Gula", "Air Mineral"] },
      { transaction_id: "TRX-016", items: ["Kopi Susu Senja", "Croissant Mentega"] },
      { transaction_id: "TRX-017", items: ["Americano Dingin", "Croissant Mentega"] },
      { transaction_id: "TRX-018", items: ["Kopi Susu Senja", "Donat Gula"] },
      { transaction_id: "TRX-019", items: ["Roti Bakar Cokelat", "Kopi Susu Senja"] },
      { transaction_id: "TRX-020", items: ["Kopi Susu Senja", "Croissant Mentega", "Donat Gula"] }
    ],

    reviews: [
      { review_id: "REV-001", customer: "Andi Pratama", language: "id", rating: 5, review_text: "Kopi susu gula arennya sangat nikmat, tempatnya nyaman banget buat nugas dan WiFi super kencang!", sentiment_label: "Positif", keywords: ["nikmat", "nyaman", "kencang", "kopi"] },
      { review_id: "REV-002", customer: "Siti Nurhaliza", language: "id", rating: 2, review_text: "Pelayanan kasir sangat lambat saat jam sibuk sore. Antrean panjang dan pesanan croissant dingin.", sentiment_label: "Negatif", keywords: ["lambat", "panjang", "dingin", "kecewa"] },
      { review_id: "REV-003", customer: "Budi Santoso", language: "id", rating: 4, review_text: "Rasa kopi enak dan pastry renyah, tapi tempat parkir motor agak sempit di akhir pekan.", sentiment_label: "Positif", keywords: ["enak", "renyah", "sempit"] },
      { review_id: "REV-004", customer: "Jessica Tan", language: "en", rating: 5, review_text: "Amazing ambiance, aromatic single-origin beans, and exceptionally friendly baristas! Highly recommended.", sentiment_label: "Positif", keywords: ["amazing", "aromatic", "friendly", "recommended"] },
      { review_id: "REV-005", customer: "Michael Wong", language: "en", rating: 1, review_text: "Terrible service today. Waited over 30 minutes for a cold brew that never arrived. Horrible experience.", sentiment_label: "Negatif", keywords: ["terrible", "waited", "horrible", "never"] },
      { review_id: "REV-006", customer: "Rian Kusuma", language: "id", rating: 3, review_text: "Kopi standar seperti cafe pada umumnya, harga lumayan terjangkau dan tempat duduk cukup banyak.", sentiment_label: "Netral", keywords: ["standar", "terjangkau", "cukup"] },
      { review_id: "REV-007", customer: "Sarah Jenkins", language: "en", rating: 4, review_text: "Great workspace for remote workers. Good lighting and comfortable seats, although music can be loud.", sentiment_label: "Positif", keywords: ["great", "comfortable", "loud"] },
      { review_id: "REV-008", customer: "Dewi Lestari", language: "id", rating: 1, review_text: "Sangat kecewa dengan kebersihan toilet dan meja yang kotor tidak langsung dibersihkan staf.", sentiment_label: "Negatif", keywords: ["kecewa", "kotor", "kebersihan"] }
    ]
  };

  /**
   * Simple CSV parser for browser environments
   */
  function parseCSV(csvText) {
    const lines = csvText.trim().split("\n");
    if (lines.length === 0) return [];
    const headers = lines[0].split(",").map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(",").map(v => v.trim());
      const row = {};
      headers.forEach((h, i) => {
        let val = values[i];
        if (val === "" || val === undefined) {
          row[h] = null;
        } else if (!isNaN(val) && val !== "") {
          row[h] = Number(val);
        } else {
          row[h] = val;
        }
      });
      return row;
    });
  }

  return {
    async getCoffeeSales() {
      try {
        const res = await fetch("../data/coffee_sales.csv");
        if (res.ok) {
          const text = await res.text();
          return parseCSV(text);
        }
      } catch (e) {
        // Fallback for file:// or offline mode
      }
      return embeddedData.coffeeSales;
    },

    async getDirtyData() {
      try {
        const res = await fetch("../data/dirty_coffee_data.csv");
        if (res.ok) {
          const text = await res.text();
          return parseCSV(text);
        }
      } catch (e) {
        // Fallback
      }
      return embeddedData.dirtyCoffeeData;
    },

    async getCustomerChurn() {
      try {
        const res = await fetch("../data/customer_churn.csv");
        if (res.ok) {
          const text = await res.text();
          return parseCSV(text);
        }
      } catch (e) {
        // Fallback
      }
      return embeddedData.customerChurn;
    },

    async getCustomerClustering() {
      try {
        const res = await fetch("../data/customer_clustering.csv");
        if (res.ok) {
          const text = await res.text();
          return parseCSV(text);
        }
      } catch (e) {
        // Fallback
      }
      return embeddedData.customerClustering;
    },

    async getTransactions() {
      try {
        const res = await fetch("../data/transactions.json");
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        // Fallback
      }
      return embeddedData.transactions;
    },

    async getReviews() {
      try {
        const res = await fetch("../data/customer_reviews.json");
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        // Fallback
      }
      return embeddedData.reviews;
    }
  };
})();

// Export globally
window.DataLoader = DataLoader;
