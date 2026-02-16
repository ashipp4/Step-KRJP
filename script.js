// -------------------------------
// IJ ISO Step Page (JA/KR + Tabs)
// - Safe DOM updates (no crash if elements are removed)
// - Keeps: language toggle, timeline (0~12), per-card tabs (rule/sales), search, dark theme
// -------------------------------

const UI = {
  lang: "ja", // "ja" | "ko"
  query: "",
  tabByStep: new Map(), // stepId -> "rule" | "sales"
};

// -------------------------------
// UI Text (Edit here)
// ※ heroNote is kept but page won't crash even if #heroNote is removed from HTML.
//   If you want to remove the "使い方" guide completely, set heroNote: "" (already "")
// -------------------------------
const TEXT = {
  ja: {
    title: "IJ 商品化プロセス（ISO Step）",
    sub: "規定と営業視点を一画面で切替できる学習・参照用ページ",
    heroH1: "全体Processを把握、ステップごとのやることを確認。",
   heroP:
  "各ステップで 規定 と 営業視点 を切替し、次ゲートに進むために必要な依頼・受領物を整理できます。<br><span class='warn'>※最終判断は原本PDF・関係部門の指示に従ってください。</span><br><br>基本的に必要書類は「ステップ移行チェックリスト」のみ作成します。<br>他の書類はこれの補足用です。<br><br>※<a href='https://konicaminoltaglobal.sharepoint.com/sites/kmo-kmidiv/IJDivision/Pages/qiso.aspx' target='_blank'>https://konicaminoltaglobal.sharepoint.com/sites/kmo-kmidiv/IJDivision/Pages/qiso.aspx</a>",
    heroNote: "", // ←「使い方」案内を消したいので空
    tlTitle: "ISO Step タイムライン",
    tlHint: "クリックすると該当ステップへ移動します。",
    stepsTitle: "ステップ一覧",
    footer:
      "※本ページは学習・参照用。最終判断は原本PDF・関係部門の指示に従ってください。",
    tabRule: "規定",
    tabSales: "営業視点",
    secPurpose: "目的/位置づけ",
    secMust: "必須対応（規定ベース）",
    secGate: "ゲート/次へ進む条件（規定）",
    secSales: "営業アクション",
    secDev: "開発へ依頼・受領物",
    secQa: "品質へ依頼・受領物",
    secNext: "次Gate条件（営業視点）",
    chipStep: "Step",
    dash: "—",
  },
  ko: {
    title: "IJ 상품화 프로세스(ISO Step)",
    sub: "규정과 영업 시점을 한 화면에서 전환하는 학습/참고용 페이지",
    heroH1: "전체 흐름을 잡고, 단계별 ‘할 일’을 헷갈리지 않게.",
    heroP:
      "각 단계에서 ‘규정’과 ‘영업 시점’을 전환하며 다음 게이트로 가기 위해 필요한 요청/수령물을 한눈에 정리합니다. ※최종 판단은 원문 PDF 및 관계 부서 지시에 따르세요.",
    heroNote: "", // ← 사용법 박스 제거(빈 문자열)
    tlTitle: "ISO Step 타임라인",
    tlHint: "클릭하면 해당 단계로 이동합니다.",
    stepsTitle: "단계 목록",
    footer:
      "※본 페이지는 학습/참고용 정리본입니다. 최종 판단은 원문 PDF 및 관계 부서 지시에 따르세요.",
    tabRule: "규정",
    tabSales: "영업 시점",
    secPurpose: "목적/포지션",
    secMust: "필수 대응(규정 기반)",
    secGate: "게이트/다음 단계 조건(규정)",
    secSales: "영업 액션",
    secDev: "개발 요청·수령물",
    secQa: "품질 요청·수령물",
    secNext: "다음 Gate 조건(영업 시점)",
    chipStep: "Step",
    dash: "—",
  },
};

// -------------------------------
// Data (Edit here)
// ※ You already have STEPS in your file. Paste your STEPS array here 그대로.
// -------------------------------
const STEPS = [
  {
    id: "s0",
    short: { ja: "市場", ko: "시장" },
    title: { ja: "市場調査・情報収集", ko: "시장조사·정보수집" },
    meta: { ja: "ニーズ整理 / 適用条件把握", ko: "니즈 정리 / 적용조건 파악" },
    rule: {
      purpose: {
        ja: ["顧客ニーズおよび市場動向の把握", "競合・適用用途の整理"],
        ko: ["고객 니즈 및 시장 동향 파악", "경쟁사/적용 용도 정리"],
      },
      must: {
        ja: ["想定用途・数量・導入時期の仮置き", "主要リスクの一次抽出（粗）"],
        ko: ["예상 용도·수량·도입 시기 가설 설정", "주요 리스크 1차 도출(러프)"],
      },
      gate: {
        ja: ["次工程に進むための前提情報が整理されていること"],
        ko: ["다음 단계 진행을 위한 전제 정보가 정리되어 있을 것"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "顧客課題・用途・運用条件（溶剤/温度/装置条件等）を文書化すること",
          "想定数量・価格帯・導入時期（ロードマップ）を整理すること",
          "競合採用状況（採用Head/方式/条件）を整理すること",
        ],
        ko: [
          "고객 과제·용도·운용 조건(용제/온도/장비 조건 등)을 문서화할 것",
          "예상 수량·가격대·도입 시기(로드맵)를 정리할 것",
          "경쟁 채택 현황(채택 Head/방식/조건)을 정리할 것",
        ],
      },
      devReq: {
        ja: [
          "既存製品での対応可否（一次見解）",
          "技術的成立性および主要ボトルネックの一次見解（温度/溶剤/信頼性等）",
        ],
        ko: [
          "기존 제품으로 대응 가능 여부(1차 의견)",
          "기술 성립성 및 주요 병목 1차 의견(온도/용제/신뢰성 등)",
        ],
      },
      qaReq: {
        ja: ["類似用途における過去不具合・クレーム傾向の有無（一次確認）"],
        ko: ["유사 용도에서 과거 불량·클레임 경향 유무(1차 확인)"],
      },
      nextGate: {
        ja: ["「誰が/何に/いつ/いくらで」の骨格が整理されていること"],
        ko: ["“누가/무엇을/언제/얼마에”의 뼈대가 정리되어 있을 것"],
      },
    },
  },

  {
    id: "s1",
    short: { ja: "提案", ko: "제안" },
    title: { ja: "新製品提案会議", ko: "신제품 제안 회의" },
    meta: { ja: "先行検討 / 区分確定", ko: "선행 검토 / 구분 확정" },
    rule: {
      purpose: {
        ja: ["事業として検討する価値の判断", "先行開発/検証の着手可否を決定"],
        ko: ["사업 검토 가치 판단", "선행개발/검증 착수 여부 결정"],
      },
      must: {
        ja: ["提案区分（例：Aa/Bb/Cc）を整理", "提案資料・議事録の保管"],
        ko: ["제안 구분(예: Aa/Bb/Cc) 정리", "제안자료/회의록 보관"],
      },
      gate: {
        ja: ["区分確定および承認取得"],
        ko: ["구분 확정 및 승인 확보"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "提案区分に必要な売上根拠（数量×単価×期間）を提示すること",
          "顧客要求事項と当社対応範囲（保証/免責含む）を区分すること",
          "検証目的（何を確認するか）を明確化すること",
        ],
        ko: [
          "제안 구분에 필요한 매출 근거(수량×단가×기간)를 제시할 것",
          "고객 요구사항과 당사 대응 범위(보증/면책 포함)를 구분할 것",
          "검증 목적(무엇을 확인할지)을 명확화할 것",
        ],
      },
      devReq: {
        ja: ["技術的成立性の一次見解", "開発期間/工数の目安", "主要リスク項目の提示"],
        ko: ["기술 성립성 1차 의견", "개발 기간/공수 가늠", "주요 리스크 항목 제시"],
      },
      qaReq: {
        ja: ["販売リスク（規制/品質観点）の一次確認", "社外説明上の注意点"],
        ko: ["판매 리스크(규제/품질 관점) 1차 확인", "대외 설명 시 주의점"],
      },
      nextGate: {
        ja: ["区分および次工程（α/企画等）への進め方が合意されていること"],
        ko: ["구분 및 다음 단계(α/기획 등) 진행 방식이 합의되어 있을 것"],
      },
    },
  },

  {
    id: "s2",
    short: { ja: "α", ko: "α" },
    title: { ja: "α品出荷判定会議", ko: "α품 출하 판정 회의" },
    meta: { ja: "無償 / 研究用途 / 免責", ko: "무상 / 연구용도 / 면책" },
    rule: {
      purpose: {
        ja: ["仮説検証目的でのα出荷可否を判断", "安全/品質上の重大リスク有無を確認"],
        ko: ["가설 검증 목적 α 출하 가능 여부 판단", "안전/품질 중대 리스크 유무 확인"],
      },
      must: {
        ja: ["α品の位置づけ（無償・研究用途・保証外）を明示", "出荷条件の記録・保管"],
        ko: ["α품 성격(무상·연구용·보증 외) 명시", "출하 조건 기록/보관"],
      },
      gate: {
        ja: ["出荷条件/免責条件が承認済であること"],
        ko: ["출하 조건/면책 조건 승인 완료"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "顧客へα品の前提（無償/免責/検証用）を明確に説明すること",
          "使用条件（溶剤/温度/運用/駆動条件）を文書で回収すること",
          "評価期間・報告内容（アウトプット）を事前合意すること",
        ],
        ko: [
          "고객에 α품 전제(무상/면책/검증용)를 명확히 설명할 것",
          "사용 조건(용제/온도/운용/구동 조건)을 문서로 회수할 것",
          "평가 기간·보고 내용(산출물)을 사전 합의할 것",
        ],
      },
      devReq: {
        ja: ["最低限の動作/性能確認結果", "禁止条件・注意事項（運用/材料相性等）"],
        ko: ["최소 동작/성능 확인 결과", "금지 조건·주의사항(운용/재료 상성 등)"],
      },
      qaReq: {
        ja: ["免責文言・出荷条件の確認", "特採の要否（該当時）"],
        ko: ["면책 문구·출하 조건 확인", "특채 필요 여부(해당 시)"],
      },
      nextGate: {
        ja: ["評価の目的/条件/報告が合意され、社内承認が完了していること"],
        ko: ["평가 목적/조건/보고가 합의되고 사내 승인이 완료되어 있을 것"],
      },
    },
  },

  {
    id: "s3",
    short: { ja: "企画", ko: "기획" },
    title: { ja: "新製品企画会議", ko: "신제품 기획 회의" },
    meta: { ja: "製品化方針 / スコープ確定", ko: "제품화 방침 / 범위 확정" },
    rule: {
      purpose: {
        ja: ["商品企画の妥当性を確認し、製品化を進めるか決定"],
        ko: ["상품 기획 타당성 확인 후 제품화 진행 여부 결정"],
      },
      must: {
        ja: ["企画内容/スコープ/前提条件を文書化", "役割分担・体制の明確化"],
        ko: ["기획 내용/범위/전제 조건 문서화", "역할 분담/체계 명확화"],
      },
      gate: {
        ja: ["製品化着手の承認および主要マイルストーン合意"],
        ko: ["제품화 착수 승인 및 주요 마일스톤 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "顧客要求（必須/希望）を整理し、凍結ルールを合意すること",
          "価格帯・導入スケジュールの整合性を確認すること",
          "変更発生時の差戻し条件（どこで止めるか）を共有すること",
        ],
        ko: [
          "고객 요구(필수/희망)를 정리하고 동결(고정) 룰을 합의할 것",
          "가격대·도입 일정 정합성을 확인할 것",
          "변경 발생 시 되돌림 조건(어디서 멈출지)을 공유할 것",
        ],
      },
      devReq: {
        ja: ["仕様定義（初版）", "主要リスクと代替案（方針）"],
        ko: ["사양 정의(초안)", "주요 리스크 및 대안(방침)"],
      },
      qaReq: {
        ja: ["品質上の懸念点（初期）", "評価項目/判定観点（案）"],
        ko: ["품질 우려점(초기)", "평가 항목/판정 관점(안)"],
      },
      nextGate: {
        ja: ["仕様/スコープが文書化され、評価観点が揃っていること"],
        ko: ["사양/스코프가 문서화되고 평가 관점이 정리되어 있을 것"],
      },
    },
  },

  {
    id: "s4",
    short: { ja: "β", ko: "β" },
    title: { ja: "β品出荷判定会議", ko: "β품 출하 판정 회의" },
    meta: { ja: "要求明確化 / 無償評価", ko: "요구 명확화 / 무상 평가" },
    rule: {
      purpose: {
        ja: ["顧客要求の明確化を目的としたβ出荷可否を判断"],
        ko: ["고객 요구 명확화를 위한 β 출하 가능 여부 판단"],
      },
      must: {
        ja: ["β品（無償）前提の確認", "評価条件/目的/フィードバック手順の明確化"],
        ko: ["β품(무상) 전제 확인", "평가 조건/목적/피드백 절차 명확화"],
      },
      gate: {
        ja: ["評価計画の合意および承認取得"],
        ko: ["평가 계획 합의 및 승인 확보"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "顧客要求仕様を文書で確定すること（差分含む）",
          "評価計画（期間/数量/報告）を合意すること",
          "無償条件および責任範囲（保証/免責）を整理すること",
        ],
        ko: [
          "고객 요구 사양을 문서로 확정할 것(차분 포함)",
          "평가 계획(기간/수량/보고)을 합의할 것",
          "무상 조건 및 책임 범위(보증/면책)를 정리할 것",
        ],
      },
      devReq: {
        ja: ["性能/制約の説明資料", "運用上の注意事項（推奨条件等）"],
        ko: ["성능/제약 설명자료", "운용 주의사항(권장 조건 등)"],
      },
      qaReq: {
        ja: ["評価基準・判定観点の確認", "特採の要否（該当時）"],
        ko: ["평가 기준·판정 관점 확인", "특채 필요 여부(해당 시)"],
      },
      nextGate: {
        ja: ["要求仕様・評価計画が合意され、承認が完了していること"],
        ko: ["요구사양/평가계획이 합의되고 승인이 완료되어 있을 것"],
      },
    },
  },

  {
    id: "s5",
    short: { ja: "設計", ko: "설계" },
    title: { ja: "設計試作（設計審査/DR）", ko: "설계 시제품(설계심사/DR)" },
    meta: { ja: "設計妥当性 / 変更管理", ko: "설계 타당성 / 변경관리" },
    rule: {
      purpose: {
        ja: ["設計の妥当性（性能/信頼性/製造性）を確認"],
        ko: ["설계 타당성(성능/신뢰성/제조성) 확인"],
      },
      must: {
        ja: ["設計レビュー/試験結果の記録", "仕様変更の管理（ルール順守）"],
        ko: ["설계 리뷰/시험 결과 기록", "사양 변경 관리(룰 준수)"],
      },
      gate: {
        ja: ["設計審査（DR）承認が取得されていること"],
        ko: ["설계심사(DR) 승인 확보"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "顧客要求変更は即時に共有し、凍結ルールに従い取り扱うこと",
          "短納期要求に対してはリスクと影響範囲を明確に説明すること",
          "次工程へ進むための前提（仕様・条件）を固定すること",
        ],
        ko: [
          "고객 요구 변경은 즉시 공유하고 동결 룰에 따라 처리할 것",
          "단납 요구에는 리스크와 영향 범위를 명확히 설명할 것",
          "다음 단계 진행 전제(사양/조건)를 고정할 것",
        ],
      },
      devReq: {
        ja: ["最新版仕様書/要件対応表", "試験結果サマリ（OK/NG/課題）", "次工程の見通し"],
        ko: ["최신 사양서/요건 대응표", "시험 결과 요약(OK/NG/과제)", "다음 단계 전망"],
      },
      qaReq: {
        ja: ["信頼性評価の状況/課題", "品質リスクの重点項目"],
        ko: ["신뢰성 평가 진행/과제", "품질 리스크 중점 항목"],
      },
      nextGate: {
        ja: ["仕様が整い、設計審査承認が完了していること"],
        ko: ["사양이 정리되고 설계심사 승인이 완료되어 있을 것"],
      },
    },
  },

  {
    id: "s6",
    short: { ja: "有償", ko: "유상" },
    title: { ja: "サンプル品販売決定会議", ko: "샘플품 판매 결정 회의" },
    meta: { ja: "有償条件 / 保証・免責", ko: "유상 조건 / 보증·면책" },
    rule: {
      purpose: {
        ja: ["サンプル品（有償）として販売する可否を判断"],
        ko: ["샘플품(유상) 판매 가능 여부 판단"],
      },
      must: {
        ja: ["販売条件/保証範囲/免責条件の明確化", "承認・議事録の保管"],
        ko: ["판매 조건/보증 범위/면책 조건 명확화", "승인/회의록 보관"],
      },
      gate: {
        ja: ["販売条件確定および承認取得"],
        ko: ["판매 조건 확정 및 승인 확보"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "価格/納期/支払条件を確定し、文書化すること",
          "クレーム時の取り扱い（解析/交換/費用負担）を整理すること",
          "用途・条件変更時は再審議対象であることを明示すること",
        ],
        ko: [
          "가격/납기/지불 조건을 확정하고 문서화할 것",
          "클레임 시 처리(분석/교환/비용 부담)를 정리할 것",
          "용도/조건 변경 시 재심의 대상임을 명시할 것",
        ],
      },
      devReq: {
        ja: ["性能範囲（できること/できないこと）", "社外QA用の技術ポイント"],
        ko: ["성능 범위(가능/불가)", "대외 Q&A용 기술 포인트"],
      },
      qaReq: {
        ja: ["保証/免責文言の確認", "特採の要否および条件（該当時）"],
        ko: ["보증/면책 문구 확인", "특채 필요 여부 및 조건(해당 시)"],
      },
      nextGate: {
        ja: ["販売条件が文書化され、承認が完了していること"],
        ko: ["판매 조건이 문서화되고 승인이 완료되어 있을 것"],
      },
    },
  },

  {
    id: "s7",
    short: { ja: "生試", ko: "생시" },
    title: { ja: "生産試作 / 生試性能確認会議", ko: "생산 시제품 / 생시 성능확인 회의" },
    meta: { ja: "量産性/品質の確認", ko: "양산성/품질 확인" },
    rule: {
      purpose: {
        ja: ["生産試作で量産性・品質を確認し、次工程へ進む可否を判断"],
        ko: ["생산 시제품으로 양산성·품질 확인 후 다음 단계 여부 판단"],
      },
      must: {
        ja: ["試作結果/課題/対策の記録", "関係部門の合意取得"],
        ko: ["시작 결과/과제/대책 기록", "관계부서 합의 확보"],
      },
      gate: {
        ja: ["生試性能確認会議での合意"],
        ko: ["생시 성능확인 회의 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "顧客導入スケジュールと社内マイルストーンの整合を取ること",
          "量産移行を見据えたForecast/発注計画の取得を進めること",
          "初期不具合時の連絡・エスカレーション手順を共有すること",
        ],
        ko: [
          "고객 도입 일정과 사내 마일스톤 정합을 맞출 것",
          "양산 이행을 고려한 Forecast/발주 계획 확보를 추진할 것",
          "초기 불량 발생 시 연락/에스컬레이션 절차를 공유할 것",
        ],
      },
      devReq: {
        ja: ["生試結果サマリ（安定性/ばらつき/課題）", "残課題と対策スケジュール", "量試移行条件"],
        ko: ["생시 결과 요약(안정성/편차/과제)", "잔여 과제 및 대책 일정", "양시 이행 조건"],
      },
      qaReq: {
        ja: ["重点管理ポイント（初期）", "検査/出荷判定の観点（要約）"],
        ko: ["중점 관리 포인트(초기)", "검사/출하 판정 관점(요약)"],
      },
      nextGate: {
        ja: ["量産移行の見通しと条件が整理されていること"],
        ko: ["양산 이행 전망과 조건이 정리되어 있을 것"],
      },
    },
  },

  {
    id: "s8",
    short: { ja: "販売", ko: "판매" },
    title: { ja: "新製品販売決定会議", ko: "신제품 판매 결정 회의" },
    meta: { ja: "販売開始判断 / 体制整備", ko: "판매 개시 판단 / 체계 정비" },
    rule: {
      purpose: {
        ja: ["販売開始の可否判断（条件/供給/品質/サポート）"],
        ko: ["판매 개시 가능 여부 판단(조건/공급/품질/서포트)"],
      },
      must: {
        ja: ["価格/供給/サポート体制の確定", "販売資料・社外説明資料の整備"],
        ko: ["가격/공급/서포트 체계 확정", "판매/대외 설명 자료 정비"],
      },
      gate: {
        ja: ["承認取得（販売開始）"],
        ko: ["승인 확보(판매 개시)"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "価格表・見積条件・取引条件を確定すること",
          "顧客向け提供範囲（保証/免責/制約）を明確化すること",
          "問い合わせ窓口とエスカレーション手順を明確化すること",
        ],
        ko: [
          "가격표/견적 조건/거래 조건을 확정할 것",
          "고객 제공 범위(보증/면책/제약)를 명확화할 것",
          "문의 창구 및 에스컬레이션 절차를 명확화할 것",
        ],
      },
      devReq: {
        ja: ["最終仕様書", "FAQ/制約条件の整理", "推奨条件（提示可能範囲）"],
        ko: ["최종 사양서", "FAQ/제약 조건 정리", "권장 조건(제시 가능 범위)"],
      },
      qaReq: {
        ja: ["初期流動管理の方針", "重大不良時の対応ルール"],
        ko: ["초기 유동 관리 방침", "중대 불량 시 대응 룰"],
      },
      nextGate: {
        ja: ["販売開始に必要な社内体制・資料が整備されていること"],
        ko: ["판매 개시에 필요한 사내 체계/자료가 정비되어 있을 것"],
      },
    },
  },

  {
    id: "s9",
    short: { ja: "量試", ko: "양시" },
    title: { ja: "量産試作 / 量試性能確認会議", ko: "양산 시제품 / 양시 성능확인 회의" },
    meta: { ja: "量産移行の最終判断", ko: "양산 이행 최종 판단" },
    rule: {
      purpose: {
        ja: ["量産試作で量産移行の最終判断を行う"],
        ko: ["양산 시제품으로 양산 이행 최종 판단"],
      },
      must: {
        ja: ["量産条件/検査/供給の安定性を確認"],
        ko: ["양산 조건/검사/공급 안정성 확인"],
      },
      gate: {
        ja: ["量試性能確認会議での合意"],
        ko: ["양시 성능확인 회의 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "量産Forecast/PO計画の具体化を進めること",
          "供給能力/納期の前提を顧客と共有すること",
          "初期量産トラブル時の対応体制を再確認すること",
        ],
        ko: [
          "양산 Forecast/PO 계획 구체화를 추진할 것",
          "공급 능력/납기 전제를 고객과 공유할 것",
          "초기 양산 트러블 대응 체계를 재확인할 것",
        ],
      },
      devReq: {
        ja: ["量産条件（推奨運用）の最終版", "安定性データ（要点）"],
        ko: ["양산 조건(권장 운용) 최종본", "안정성 데이터(핵심)"],
      },
      qaReq: {
        ja: ["検査基準/出荷判定の最終確認", "初期流動の監視項目"],
        ko: ["검사 기준/출하 판정 최종 확인", "초기 유동 모니터링 항목"],
      },
      nextGate: {
        ja: ["量産移行のGo/No-Goと条件が明確であること"],
        ko: ["양산 이행 Go/No-Go 및 조건이 명확할 것"],
      },
    },
  },

  {
    id: "s10",
    short: { ja: "初期", ko: "초기" },
    title: { ja: "量産（初期）/ 新製品販売レビュー", ko: "양산(초기)/ 신제품 판매 리뷰" },
    meta: { ja: "初期品質/市場状況のレビュー", ko: "초기 품질/시장 상황 리뷰" },
    rule: {
      purpose: {
        ja: ["販売開始後の初期品質・市場状況をレビューし、是正を回す"],
        ko: ["판매 개시 후 초기 품질/시장 상황을 리뷰하고 시정을 수행"],
      },
      must: {
        ja: ["市場品質情報の集約と再発防止の推進"],
        ko: ["시장 품질 정보 집약 및 재발 방지 추진"],
      },
      gate: {
        ja: ["レビュー（報告/確認）"],
        ko: ["리뷰(보고/확인)"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "顧客からの不具合情報を迅速に収集し、事実/推定を区分して共有すること",
          "影響範囲（他顧客/他用途）を整理し、必要な注意喚起を行うこと",
          "顧客コミュニケーション（暫定/恒久対策）の窓口を一本化すること",
        ],
        ko: [
          "고객 불량 정보를 신속히 수집하고 사실/추정을 구분해 공유할 것",
          "영향 범위(타 고객/타 용도)를 정리하고 필요 시 주의 환기를 할 것",
          "고객 커뮤니케이션(임시/영구 대책) 창구를 일원화할 것",
        ],
      },
      devReq: {
        ja: ["原因解析の支援", "暫定対策/恒久対策案", "再発防止の方向性"],
        ko: ["원인 분석 지원", "임시/영구 대책안", "재발 방지 방향성"],
      },
      qaReq: {
        ja: ["クレーム判断/対応方針", "再発防止の文書化/管理"],
        ko: ["클레임 판단/대응 방침", "재발 방지 문서화/관리"],
      },
      nextGate: {
        ja: ["初期流動が収束し、定常運用へ移行可能であること"],
        ko: ["초기 유동이 수습되어 정규 운용으로 이행 가능할 것"],
      },
    },
  },

  {
    id: "s11",
    short: { ja: "定常", ko: "정규" },
    title: { ja: "量産（定常）/ 市場品質管理", ko: "양산(정규)/ 시장 품질 관리" },
    meta: { ja: "安定供給 / 継続改善", ko: "안정 공급 / 지속 개선" },
    rule: {
      purpose: {
        ja: ["市場品質の監視と継続改善", "変更は変更管理プロセスに従う"],
        ko: ["시장 품질 모니터링 및 지속 개선", "변경은 변경관리 프로세스 준수"],
      },
      must: {
        ja: ["変更管理/品質記録の継続", "重大問題のエスカレーション"],
        ko: ["변경관리/품질 기록 지속", "중대 문제 에스컬레이션"],
      },
      gate: {
        ja: ["定常運用（必要に応じて変更審査）"],
        ko: ["정규 운용(필요 시 변경 심사)"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "用途変更・条件変更の兆候を早期に把握し、正式プロセスへ載せること",
          "価格/納期/供給の前提を継続管理すること",
          "重要顧客の品質課題を定期的に棚卸しすること",
        ],
        ko: [
          "용도/조건 변경 징후를 조기에 파악하고 정식 프로세스로 태울 것",
          "가격/납기/공급 전제를 지속 관리할 것",
          "중요 고객 품질 과제를 정기적으로 점검할 것",
        ],
      },
      devReq: {
        ja: ["改善要求の影響/リスク評価", "代替案/スケジュール"],
        ko: ["개선 요구 영향/리스크 평가", "대안/일정"],
      },
      qaReq: {
        ja: ["市場クレーム傾向分析", "品質指標/監視項目の共有"],
        ko: ["시장 클레임 경향 분석", "품질 지표/모니터링 항목 공유"],
      },
      nextGate: {
        ja: ["変更がある場合、変更審査に必要な条件が揃っていること"],
        ko: ["변경이 있을 경우 변경 심사에 필요한 조건이 갖춰져 있을 것"],
      },
    },
  },

  {
    id: "s12",
    short: { ja: "終売", ko: "종료" },
    title: { ja: "生産終了確認会議", ko: "생산 종료 확인 회의" },
    meta: { ja: "終売 / 代替提案 / 影響管理", ko: "종료 / 대체 제안 / 영향 관리" },
    rule: {
      purpose: {
        ja: ["生産終了の妥当性確認と顧客影響の管理"],
        ko: ["생산 종료 타당성 확인 및 고객 영향 관리"],
      },
      must: {
        ja: ["在庫/代替/サポート終了計画の整理", "顧客通知と記録保管"],
        ko: ["재고/대체/지원 종료 계획 정리", "고객 통지 및 기록 보관"],
      },
      gate: {
        ja: ["生産終了確認会議での合意"],
        ko: ["생산 종료 확인 회의 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: [
          "顧客へ終売通知（時期/最終発注/最終出荷）を行うこと",
          "代替品ロードマップおよび移行条件を提示すること",
          "最後の需給調整（在庫/納期）を行うこと",
        ],
        ko: [
          "고객에 종료 공지(시기/최종 발주/최종 출하)를 할 것",
          "대체품 로드맵 및 이행 조건을 제시할 것",
          "마지막 수급 조정(재고/납기)을 수행할 것",
        ],
      },
      devReq: {
        ja: ["代替品の技術差分/移行支援範囲", "サポート終了時期"],
        ko: ["대체품 기술 차분/이행 지원 범위", "지원 종료 시점"],
      },
      qaReq: {
        ja: ["残存リスク/回収要否の判断", "終売後のクレーム対応ルール"],
        ko: ["잔존 리스크/회수 필요 여부 판단", "종료 후 클레임 대응 룰"],
      },
      nextGate: {
        ja: ["顧客影響最小化の計画が確定していること"],
        ko: ["고객 영향 최소화 계획이 확정되어 있을 것"],
      },
    },
  },
];

// -------------------------------
// DOM helpers
// -------------------------------
const $ = (sel) => document.querySelector(sel);

const setText = (sel, val) => {
  const el = $(sel);
  if (!el) return;
  el.textContent = val ?? "";
};

const setHTML = (sel, html) => {
  const el = $(sel);
  if (!el) return;
  el.innerHTML = html ?? "";
};

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));

// -------------------------------
// Render
// -------------------------------
function applyUIText() {
  const t = TEXT[UI.lang];
  document.documentElement.lang = UI.lang === "ja" ? "ja" : "ko";

  setText("#uiTitle", t.title);
  setText("#uiSub", t.sub);
  setText("#heroH1", t.heroH1);
  setHTML("#heroP", t.heroP);

  // ✅ #heroNote 요소를 HTML에서 삭제해도 페이지가 안 깨짐
  // ✅ heroNote 문자열이 빈 값이면, 요소가 있더라도 내용은 비워짐
  setText("#heroNote", t.heroNote);

  setText("#tlTitle", t.tlTitle);
  setText("#tlHint", t.tlHint);
  setText("#stepsTitle", t.stepsTitle);
  setText("#footerText", t.footer);

  setText("#langLabel", UI.lang === "ja" ? "日本語" : "한국어");
  setText("#langAlt", UI.lang === "ja" ? "한국어" : "日本語");
}

function buildTimeline() {
  const t = TEXT[UI.lang];
  const wrap = $("#timelineChips");
  if (!wrap) return;

  wrap.innerHTML = "";

  STEPS.forEach((s, idx) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.dataset.to = s.id;

    chip.innerHTML =
      `${escapeHtml(t.chipStep)} ${idx} · ${escapeHtml(s.short?.[UI.lang])}` +
      `<small>${escapeHtml(s.title?.[UI.lang])}</small>`;

    wrap.appendChild(chip);
  });
}

function kvBlock(title, items) {
  const t = TEXT[UI.lang];
  const arr = Array.isArray(items) ? items : [];
  const ul = arr.length
    ? `<ul>${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
    : `<ul><li class="muted">${escapeHtml(t.dash)}</li></ul>`;

  return `<div class="kv"><h4>${escapeHtml(title)}</h4>${ul}</div>`;
}

function renderStepCard(step, idx) {
  const t = TEXT[UI.lang];
  const activeTab = UI.tabByStep.get(step.id) || "rule";

  const ruleHTML =
    kvBlock(t.secPurpose, step.rule?.purpose?.[UI.lang]) +
    kvBlock(t.secMust, step.rule?.must?.[UI.lang]) +
    kvBlock(t.secGate, step.rule?.gate?.[UI.lang]);

  const salesHTML =
    kvBlock(t.secSales, step.sales?.salesActions?.[UI.lang]) +
    kvBlock(t.secDev, step.sales?.devReq?.[UI.lang]) +
    kvBlock(t.secQa, step.sales?.qaReq?.[UI.lang]) +
    kvBlock(t.secNext, step.sales?.nextGate?.[UI.lang]);

  const contentHTML = activeTab === "rule" ? ruleHTML : salesHTML;

  return `
    <article class="card step-card" id="${escapeHtml(step.id)}" data-step="${escapeHtml(step.id)}">
      <div class="step-head">
        <div>
          <div class="step-title">${escapeHtml(t.chipStep)} ${idx} · ${escapeHtml(step.title?.[UI.lang])}</div>
          <div class="step-meta">${escapeHtml(step.meta?.[UI.lang])}</div>
        </div>
        <div class="step-actions">
          <span class="pilltag">${escapeHtml(step.short?.[UI.lang])}</span>
        </div>
      </div>

      <div class="tabs" role="tablist" aria-label="view tabs">
        <button class="tab ${activeTab === "rule" ? "active" : ""}" data-tab="rule" type="button">${escapeHtml(t.tabRule)}</button>
        <button class="tab ${activeTab === "sales" ? "active" : ""}" data-tab="sales" type="button">${escapeHtml(t.tabSales)}</button>
      </div>

      <div class="content" data-content>
        ${contentHTML}
      </div>
    </article>
  `;
}

function matchesQuery(step, q) {
  if (!q) return true;

  const blob = [
    step.short?.ja, step.short?.ko,
    step.title?.ja, step.title?.ko,
    step.meta?.ja, step.meta?.ko,

    ...(step.rule?.purpose?.ja || []), ...(step.rule?.purpose?.ko || []),
    ...(step.rule?.must?.ja || []), ...(step.rule?.must?.ko || []),
    ...(step.rule?.gate?.ja || []), ...(step.rule?.gate?.ko || []),

    ...(step.sales?.salesActions?.ja || []), ...(step.sales?.salesActions?.ko || []),
    ...(step.sales?.devReq?.ja || []), ...(step.sales?.devReq?.ko || []),
    ...(step.sales?.qaReq?.ja || []), ...(step.sales?.qaReq?.ko || []),
    ...(step.sales?.nextGate?.ja || []), ...(step.sales?.nextGate?.ko || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return blob.includes(q);
}

function renderSteps() {
  const wrap = $("#stepsWrap");
  if (!wrap) return;

  const q = (UI.query || "").trim().toLowerCase();

  const filtered = STEPS
    .filter((s) => matchesQuery(s, q))
    .map((s, idx) => renderStepCard(s, idx))
    .join("");

  wrap.innerHTML = filtered;
}

function rerenderAll() {
  applyUIText();
  buildTimeline();
  renderSteps();
}

// -------------------------------
// Events (event delegation)
// -------------------------------
function onClick(e) {
  // Timeline chip click
  const chip = e.target.closest(".chip");
  if (chip?.dataset?.to) {
    const id = chip.dataset.to;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  // Tab click
  const tab = e.target.closest(".tab");
  if (tab) {
    const card = tab.closest(".step-card");
    const stepId = card?.dataset?.step;
    const to = tab.dataset.tab; // rule | sales
    if (!stepId || (to !== "rule" && to !== "sales")) return;

    UI.tabByStep.set(stepId, to);
    renderSteps();
    return;
  }

  // Language toggle
  const langBtn = e.target.closest("#langBtn");
  if (langBtn) {
    UI.lang = UI.lang === "ja" ? "ko" : "ja";
    rerenderAll();
  }
}

// Debounce search to reduce lag
let searchTimer = null;
function onInput(e) {
  if (e.target?.id === "searchInput") {
    const val = e.target.value || "";
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      UI.query = val;
      renderSteps();
    }, 180);
  }
}

// -------------------------------
// Init
// -------------------------------
document.addEventListener("click", onClick);
document.addEventListener("input", onInput);

rerenderAll();


