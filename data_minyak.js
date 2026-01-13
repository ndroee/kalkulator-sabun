// --- DATABASE TETAP SAMA SEPERTI SEBELUMNYA ---
const oilDatabase = [
  {
    id: 1,
    name: "Minyak Kelapa (Coconut Oil)",
    sap: 0.183,
    hardness: 79,
    cleansing: 67,
    condition: 10,
    bubbly: 67,
    creamy: 12,
  },
  {
    id: 2,
    name: "Minyak Kelapa Sawit (Palm Oil)",
    sap: 0.142,
    hardness: 50,
    cleansing: 1,
    condition: 49,
    bubbly: 1,
    creamy: 49,
  },
  {
    id: 3,
    name: "Minyak Zaitun (Olive Oil)",
    sap: 0.135,
    hardness: 17,
    cleansing: 0,
    condition: 83,
    bubbly: 0,
    creamy: 17,
  },
  {
    id: 4,
    name: "Minyak Jarak (Castor Oil)",
    sap: 0.128,
    hardness: 0,
    cleansing: 0,
    condition: 98,
    bubbly: 90,
    creamy: 90,
  },
  {
    id: 5,
    name: "Minyak Almond",
    sap: 0.137,
    hardness: 7,
    cleansing: 0,
    condition: 92,
    bubbly: 0,
    creamy: 7,
  },
  {
    id: 6,
    name: "Canola Oil",
    sap: 0.124,
    hardness: 13,
    cleansing: 0,
    condition: 86,
    bubbly: 0,
    creamy: 13,
  },
  {
    id: 7,
    name: "Cocoa Butter",
    sap: 0.137,
    hardness: 61,
    cleansing: 0,
    condition: 38,
    bubbly: 0,
    creamy: 61,
  },
  {
    id: 8,
    name: "Corn Oil (Jagung)",
    sap: 0.136,
    hardness: 11,
    cleansing: 0,
    condition: 88,
    bubbly: 0,
    creamy: 11,
  },
  {
    id: 9,
    name: "Grapeseed Oil",
    sap: 0.129,
    hardness: 10,
    cleansing: 0,
    condition: 89,
    bubbly: 0,
    creamy: 10,
  },
  {
    id: 10,
    name: "Lard (Babi)",
    sap: 0.139,
    hardness: 41,
    cleansing: 0,
    condition: 58,
    bubbly: 0,
    creamy: 41,
  },
  {
    id: 11,
    name: "Tallow (Sapi)",
    sap: 0.141,
    hardness: 58,
    cleansing: 8,
    condition: 40,
    bubbly: 1,
    creamy: 50,
  },
  {
    id: 12,
    name: "Shea Butter",
    sap: 0.128,
    hardness: 45,
    cleansing: 0,
    condition: 54,
    bubbly: 0,
    creamy: 45,
  },
  {
    id: 13,
    name: "Soybean Oil (Kedelai)",
    sap: 0.136,
    hardness: 18,
    cleansing: 0,
    condition: 81,
    bubbly: 0,
    creamy: 18,
  },
  {
    id: 14,
    name: "Sunflower Oil",
    sap: 0.135,
    hardness: 10,
    cleansing: 0,
    condition: 89,
    bubbly: 0,
    creamy: 10,
  },
  {
    id: 15,
    name: "Rice Bran Oil",
    sap: 0.128,
    hardness: 26,
    cleansing: 1,
    condition: 73,
    bubbly: 1,
    creamy: 26,
  },
  {
    id: 16,
    name: "Beeswax",
    sap: 0.067,
    hardness: 89,
    cleansing: 0,
    condition: 0,
    bubbly: 0,
    creamy: 0,
  },
  {
    id: 17,
    name: "Avocado Oil",
    sap: 0.133,
    hardness: 22,
    cleansing: 0,
    condition: 70,
    bubbly: 0,
    creamy: 22,
  },
];

let currentMode = "percent"; // 'percent' atau 'gram'

function loadOils() {
  const selects = document.querySelectorAll(".oil-select");
  selects.forEach((select) => {
    if (select.options.length <= 1) {
      oilDatabase.forEach((oil) => {
        let option = document.createElement("option");
        option.value = oil.id;
        option.text = oil.name;
        select.appendChild(option);
      });
    }
  });
}

function changeMode() {
  if (document.getElementById("modePercent").checked) {
    currentMode = "percent";
    document.getElementById("targetTotal").disabled = false; // Bisa edit target
    document.getElementById("targetLabel").innerText =
      "Target Berat Total (Sabun Jadi)";
    document.getElementById("targetHint").innerText =
      "Masukkan total berat adonan yang diinginkan";
    document.getElementById("col-header-input").innerText = "Input (%)";
  } else {
    currentMode = "gram";
    document.getElementById("targetTotal").disabled = true; // Read only
    document.getElementById("targetLabel").innerText =
      "Total Berat Akhir (Otomatis)";
    document.getElementById("targetHint").innerText =
      "Dihitung dari jumlah minyak yang anda input";
    document.getElementById("col-header-input").innerText = "Input (Gr)";
  }

  // Reset input agar tidak bingung, atau biarkan calculate ulang
  // Kita panggil calculate agar UI placeholder dan satuan berubah
  updateRowUI();
  calculate();
}

function updateRowUI() {
  // Ubah placeholder dan satuan di setiap baris sesuai mode
  const inputs = document.querySelectorAll(".oil-input");
  const units = document.querySelectorAll(".unit-text");

  inputs.forEach((input) => {
    input.placeholder = currentMode === "percent" ? "%" : "Gr";
  });
  units.forEach((unit) => {
    unit.innerText = currentMode === "percent" ? "%" : "Gr";
  });
}

function addRow() {
  const container = document.getElementById("oil-container");
  const div = document.createElement("div");
  div.className = "row mb-2 oil-row border-bottom pb-2";

  const placeholder = currentMode === "percent" ? "%" : "Gr";
  const unit = currentMode === "percent" ? "%" : "Gr";

  div.innerHTML = `
        <div class="col-7">
            <select class="form-select oil-select form-select-sm" onchange="calculate()">
                <option value="0">Pilih Minyak...</option>
            </select>
            <small class="text-muted ms-1">
                Hasil: <span class="calc-res fw-bold text-primary">0</span> <span class="calc-unit">gr</span>
            </small>
        </div>
        <div class="col-3">
            <div class="input-group input-group-sm">
                <input type="number" class="form-control oil-input" placeholder="${placeholder}" oninput="calculate()">
                <span class="input-group-text unit-text">${unit}</span>
            </div>
        </div>
        <div class="col-2 text-end">
             <button class="btn btn-danger btn-sm" onclick="this.closest('.oil-row').remove(); calculate()">x</button>
        </div>
    `;
  container.appendChild(div);
  loadOils();
}

function calculate() {
  const waterRatio =
    parseFloat(document.getElementById("waterRatio").value) / 100;
  const superfat = parseFloat(document.getElementById("superfat").value) / 100;

  let totalLye = 0;
  let totalOilWeight = 0;
  let totalInput = 0;

  // Prop Accumulator
  let p_hard = 0,
    p_clean = 0,
    p_cond = 0,
    p_bubb = 0;

  const rows = document.querySelectorAll(".oil-row");

  // --- LOGIKA MODE PERSENTASE ---
  if (currentMode === "percent") {
    // 1. Hitung dulu total % yang diinput user
    let tempTotalPercent = 0;
    let weightedSAP = 0;

    // Loop pertama: Hitung properti rata-rata untuk "1 Unit" campuran minyak
    rows.forEach((row) => {
      const select = row.querySelector(".oil-select");
      const val = parseFloat(row.querySelector(".oil-input").value) || 0;
      const oilId = parseInt(select.value);

      if (oilId > 0) {
        const oil = oilDatabase.find((o) => o.id === oilId);
        tempTotalPercent += val;
        // Weighted SAP contribution
        weightedSAP += oil.sap * val;
      }
    });

    // Update Badge Total
    const badge = document.getElementById("total-badge");
    badge.innerText = `Total: ${tempTotalPercent}%`;
    badge.className =
      tempTotalPercent === 100 ? "badge bg-success" : "badge bg-danger";

    // Jika belum ada input, stop
    if (tempTotalPercent === 0) return;

    // 2. Kalkulasi Mundur: Dari Total Berat Adonan -> Total Berat Minyak
    // Rumus: TotalBatch = Minyak + Air + Lye
    // Air = Minyak * WaterRatio
    // Lye = Minyak * SAP_rata2 * (1-Superfat)
    // Jadi: TotalBatch = Minyak * (1 + WaterRatio + (SAP_Avg_Real * (1-SF)))

    // Normalisasi SAP dulu (karena weightedSAP tadi berbasis jumlah persen, misal user input baru 50%, harus dibagi 50)
    const normalizedWeightedSAP = weightedSAP / tempTotalPercent;

    // Faktor Pengali
    const factor = 1 + waterRatio + normalizedWeightedSAP * (1 - superfat);

    // Ambil target user
    const targetBatch =
      parseFloat(document.getElementById("targetTotal").value) || 0;

    // DAPATKAN TOTAL BERAT MINYAK
    totalOilWeight = targetBatch / factor;

    // 3. Distribusikan ke setiap baris
    rows.forEach((row) => {
      const select = row.querySelector(".oil-select");
      const percentInput =
        parseFloat(row.querySelector(".oil-input").value) || 0;
      const resSpan = row.querySelector(".calc-res");
      const resUnit = row.querySelector(".calc-unit");
      const oilId = parseInt(select.value);

      if (oilId > 0) {
        const oil = oilDatabase.find((o) => o.id === oilId);

        // Jika total persen user belum 100, kita anggap proporsional terhadap target
        // Tapi standardnya, kita hitung exact sesuai % input.
        // Gram Minyak ini = (PersenInput / 100) * TotalOilWeight * (100 / tempTotalPercent) <- Auto Scale jika user malas hitung pas 100%
        // Agar simpel: Kita paksa user input % real.

        // Berat minyak per item
        // Logika: Jika user input 50% dan 50%, maka masing2 dapat separuh dari totalOilWeight
        const oilGram = (percentInput / tempTotalPercent) * totalOilWeight;

        resSpan.innerText = oilGram.toFixed(0);
        resUnit.innerText = "gr";

        // Hitung Lye & Props untuk totalan
        totalLye += oilGram * oil.sap;

        p_hard += oil.hardness * oilGram;
        p_clean += oil.cleansing * oilGram;
        p_cond += oil.condition * oilGram;
        p_bubb += oil.bubbly * oilGram;
      }
    });

    // --- LOGIKA MODE BERAT (GRAM) ---
  } else {
    // 1. Jumlahkan semua gram minyak inputan user
    rows.forEach((row) => {
      const select = row.querySelector(".oil-select");
      const val = parseFloat(row.querySelector(".oil-input").value) || 0;
      const oilId = parseInt(select.value);

      if (oilId > 0) {
        const oil = oilDatabase.find((o) => o.id === oilId);
        totalOilWeight += val;
        totalLye += val * oil.sap;

        p_hard += oil.hardness * val;
        p_clean += oil.cleansing * val;
        p_cond += oil.condition * val;
        p_bubb += oil.bubbly * val;
      }
    });

    // 2. Update UI baris (Tampilkan persentasenya)
    rows.forEach((row) => {
      const val = parseFloat(row.querySelector(".oil-input").value) || 0;
      const resSpan = row.querySelector(".calc-res");
      const resUnit = row.querySelector(".calc-unit");

      if (totalOilWeight > 0) {
        const percent = (val / totalOilWeight) * 100;
        resSpan.innerText = percent.toFixed(1);
        resUnit.innerText = "%";
      } else {
        resSpan.innerText = "0";
      }
    });

    // Update Badge Total
    const badge = document.getElementById("total-badge");
    badge.innerText = `Total: ${totalOilWeight} gr`;
    badge.className = "badge bg-info";
  }

  // --- FINAL CALCULATION (SAMA UNTUK KEDUA MODE) ---
  if (totalOilWeight === 0) return;

  const waterAmount = totalOilWeight * waterRatio;
  const lyeAmount = totalLye * (1 - superfat);
  const finalBatchWeight = totalOilWeight + waterAmount + lyeAmount;

  // Update Output
  document.getElementById("res-oil").innerText =
    totalOilWeight.toFixed(0) + " gr";
  document.getElementById("res-water").innerText =
    waterAmount.toFixed(1) + " gr";
  document.getElementById("res-lye").innerText = lyeAmount.toFixed(1) + " gr";
  document.getElementById("res-total").innerText =
    finalBatchWeight.toFixed(1) + " gr";

  // Jika Mode Gram, update input targetTotal agar user tau hasilnya
  if (currentMode === "gram") {
    document.getElementById("targetTotal").value = finalBatchWeight.toFixed(0);
  }

  // Update Properties
  document.getElementById("prop-hard").innerText = (
    p_hard / totalOilWeight
  ).toFixed(0);
  document.getElementById("prop-clean").innerText = (
    p_clean / totalOilWeight
  ).toFixed(0);
  document.getElementById("prop-cond").innerText = (
    p_cond / totalOilWeight
  ).toFixed(0);
  document.getElementById("prop-bubb").innerText = (
    p_bubb / totalOilWeight
  ).toFixed(0);
}

window.onload = function () {
  addRow();
};
