// -------------------------------
// IJ ISO Step Page (JA/KR + Tabs)
// -------------------------------

const UI = {
  lang: "ja", // "ja" | "ko"
  query: "",
  tabByStep: new Map(), // stepId -> "rule" | "sales"
};

const TEXT = {
  ja: {
    title: "IJ 商品化プロセス（ISO Step）",
    sub: "規定と営業視点を一画面で切替できる学習・参照用ページ",
    heroH1: "全体像を掴んで、ステップごとの「やること」を迷わない。",
    heroP:
      "各ステップで 規定 と 営業視点 を切替し、次ゲートに進むために必要な依頼・受領物を整理できます。※最終判断は原本PDF・関係部門の指示に従ってください。",
    heroNote:
      "使い方：右上で言語切替 → 各カードで「規定/営業視点」切替 → 検索で絞り込み",
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
  },
  ko: {
    title: "IJ 상품화 프로세스(ISO Step)",
    sub: "규정과 영업 시점을 한 화면에서 전환하는 학습/참고용 페이지",
    heroH1: "전체 흐름을 잡고, 단계별 ‘할 일’을 헷갈리지 않게.",
    heroP:
      "각 단계에서 ‘규정’과 ‘영업 시점’을 전환하며 다음 게이트로 가기 위해 필요한 요청/수령물을 한눈에 정리합니다. ※최종 판단은 원문 PDF 및 관계 부서 지시에 따르세요.",
    heroNote:
      "사용법: 우측 상단 언어 전환 → 각 카드에서 ‘규정/영업 시점’ 전환 → 검색으로 필터",
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
  },
};

// -------------------------------
// Data (Edit here)
// -------------------------------
const STEPS = [
  {
    id: "s0",
    short: { ja: "市場調査", ko: "시장조사" },
    title: { ja: "市場調査・情報収集", ko: "시장조사·정보수집" },
    meta: { ja: "情報整理 / ニーズ把握", ko: "정보 정리 / 니즈 파악" },
    rule: {
      purpose: {
        ja: ["顧客ニーズ・市場動向の把握", "競合・適用Applicationの整理"],
        ko: ["고객 니즈/시장 동향 파악", "경쟁/적용 Application 정리"],
      },
      must: {
        ja: ["想定顧客・用途・数量の仮置き", "基本リスクの洗い出し（粗）"],
        ko: ["예상 고객/용도/물량 가설 설정", "기본 리스크 1차 도출(러프)"],
      },
      gate: {
        ja: ["次ステップへ進める粒度の市場情報が揃っている"],
        ko: ["다음 단계로 갈 수 있을 수준의 시장 정보 확보"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客課題/用途を一文で言える状態にする", "競合採用Head/条件을 조사", "物量/価格感/導入時期(ロードマップ) 확보"],
        ko: ["고객 과제/용도를 한 문장으로 정리", "경쟁사 채택 Head/조건 조사", "물량/가격감/도입시기(로드맵) 확보"],
      },
      devReq: {
        ja: ["既存製品で対応 가능か 1차 판단", "技術的ボトルネック有無(温度/溶剤/信頼性 등)"],
        ko: ["기존 제품 대응 가능 여부 1차 판단", "기술 병목(온도/용제/신뢰성 등) 유무 확인"],
      },
      qaReq: {
        ja: ["過去不具合/クレーム傾向の有無 확인(類似用途)"],
        ko: ["유사 용도 과거 불량/클레임 경향 확인"],
      },
      nextGate: {
        ja: ["“誰が/何に/いつ/いくらで”の骨格が揃う"],
        ko: ["“누가/무엇을/언제/얼마에” 뼈대가 잡힘"],
      },
    },
  },

  {
    id: "s1",
    short: { ja: "提案", ko: "제안" },
    title: { ja: "新製品提案会議", ko: "신제품 제안 회의" },
    meta: { ja: "先行開発 着手判断", ko: "선행개발 착수 판단" },
    rule: {
      purpose: {
        ja: ["事業として検討する価値の判断", "先行開発/検証の着手可否を決定"],
        ko: ["사업 검토 가치 판단", "선행개발/검증 착수 여부 결정"],
      },
      must: {
        ja: ["売上規模×新規性で区分(例: Aa/Bb/Cc)を整理", "提案資料・議事録を保管"],
        ko: ["매출규모×신규성으로 구분(예: Aa/Bb/Cc) 정리", "제안자료/회의록 보관"],
      },
      gate: {
        ja: ["事業部長承認", "開発着手方針/概略スケジュール合意"],
        ko: ["사업부장 승인", "개발 착수 방침/개략 일정 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客・用途・競合・売上規模を明確化", "社外に出せる情報/出せない情報を線引き", "評価の目的(何を確かめるか)を定義"],
        ko: ["고객/용도/경쟁/매출규모 명확화", "대외 공유 가능/불가 정보 구분", "평가 목적(무엇을 확인할지) 정의"],
      },
      devReq: {
        ja: ["技術成立性の一次見解", "開発リソース/期間の目安", "主要リスク項目リスト"],
        ko: ["기술 성립성 1차 의견", "개발 리소스/기간 가늠", "주요 리스크 항목 리스트"],
      },
      qaReq: {
        ja: ["販売リスク(購買品含む)の一次判定", "類似クレーム/規制観点の注意点"],
        ko: ["판매 리스크(구매품 포함) 1차 판정", "유사 클레임/규제 관점 주의사항"],
      },
      nextGate: {
        ja: ["区分(Aa/Bb/Cc)が確定", "“次に何を検証するか”が合意"],
        ko: ["구분(Aa/Bb/Cc) 확정", "“다음에 무엇을 검증할지” 합의"],
      },
    },
  },

  {
    id: "s2",
    short: { ja: "α出荷", ko: "α출하" },
    title: { ja: "α品出荷判定会議", ko: "α품 출하 판정 회의" },
    meta: { ja: "仮説検証 / 無償 / 免責", ko: "가설검증 / 무상 / 면책" },
    rule: {
      purpose: {
        ja: ["仮説検証目的でのα出荷可否 판단", "安全/品質面で重大リスク가ないか 확인"],
        ko: ["가설 검증 목적 α 출하 가능 여부 판단", "안전/품질 중대 리스크 여부 확인"],
      },
      must: {
        ja: ["αは無償・試験研究用・免責の前提を明示", "出荷条件を記録"],
        ko: ["α는 무상/시험연구용/면책 전제 명시", "출하 조건 기록"],
      },
      gate: {
        ja: ["事業部長承認", "免責条件の合意（社内・必要なら顧客）"],
        ko: ["사업부장 승인", "면책 조건 합의(사내/필요 시 고객)"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客へ「α=無償/免責/検証用」を明確化", "使用条件(溶剤/温度/運用)を文書で回収", "評価期間/アウトプット(何を報告してもらうか)合意"],
        ko: ["고객에 ‘α=무상/면책/검증용’ 명확히 안내", "사용 조건(용제/온도/운용) 문서로 회수", "평가 기간/산출물(무엇을 공유받을지) 합의"],
      },
      devReq: {
        ja: ["最低限の動作/性能確認結果", "禁止条件/注意事項(波形/材料相性 등)"],
        ko: ["최소 동작/성능 확인 결과", "금지 조건/주의사항(파형/재료 상성 등)"],
      },
      qaReq: {
        ja: ["免責文言/出荷条件の確認", "特採必要性の有無(該当時)"],
        ko: ["면책 문구/출하 조건 확인", "특채 필요성 유무(해당 시)"],
      },
      nextGate: {
        ja: ["顧客評価の目的/条件/報告が合意済", "社内承認が取れている"],
        ko: ["고객 평가 목적/조건/보고 합의 완료", "사내 승인 완료"],
      },
    },
  },

  {
    id: "s3",
    short: { ja: "企画", ko: "기획" },
    title: { ja: "新製品企画会議", ko: "신제품 기획 회의" },
    meta: { ja: "製品化着手 판단", ko: "제품화 착수 판단" },
    rule: {
      purpose: {
        ja: ["商品企画の妥当性を確認し、製品化を進めるか決定"],
        ko: ["상품 기획 타당성 확인 후 제품화 진행 여부 결정"],
      },
      must: {
        ja: ["企画内容/スコープ/前提条件を明文化", "関係部門の役割分担を定義"],
        ko: ["기획 내용/범위/전제 조건 문서화", "관계 부서 역할 분담 정의"],
      },
      gate: {
        ja: ["製品化 착수 승인", "概略日程と主要マイルストーン 합의"],
        ko: ["제품화 착수 승인", "개략 일정 및 주요 마일스톤 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客要件(必須/希望)を整理して固定", "価格帯・導入スケジュールの現実성 점검", "“変更が出たらどこで止めるか”を共有"],
        ko: ["고객 요구(필수/희망) 정리해 고정", "가격대/도입 일정 현실성 점검", "‘변경 발생 시 어디서 멈출지’ 공유"],
      },
      devReq: {
        ja: ["仕様定義 초안", "リスク/代替案(Plan B)"],
        ko: ["사양 정의 초안", "리스크/대안(Plan B)"],
      },
      qaReq: {
        ja: ["品質上の懸念ポイント 초기 목록", "評価項目/基準案"],
        ko: ["품질 우려 포인트 초기 리스트", "평가 항목/기준안"],
      },
      nextGate: {
        ja: ["仕様/スコープが文書화됨", "評価の観点が揃う"],
        ko: ["사양/스코프 문서화", "평가 관점 정리 완료"],
      },
    },
  },

  {
    id: "s4",
    short: { ja: "β出荷", ko: "β출하" },
    title: { ja: "β品出荷判定会議", ko: "β품 출하 판정 회의" },
    meta: { ja: "要求明確化 / 無償", ko: "요구 명확화 / 무상" },
    rule: {
      purpose: {
        ja: ["顧客要求を明確化するためのβ出荷可否を判断"],
        ko: ["고객 요구 명확화를 위한 β 출하 가능 여부 판단"],
      },
      must: {
        ja: ["βは無償（設計試験品）前提", "評価条件/目的/フィードバック 루트를 정리"],
        ko: ["β는 무상(설계 시험품) 전제", "평가 조건/목적/피드백 루트 정리"],
      },
      gate: {
        ja: ["事業部長承認", "顧客評価 계획 합의"],
        ko: ["사업부장 승인", "고객 평가 계획 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客要求を文書で確定(要求仕様)", "評価 계획(기간/샘플 수/보고)을 합의", "무상 조건/면책 범위를 정리(필요시)"],
        ko: ["고객 요구를 문서로 확정(요구 사양)", "평가 계획(기간/수량/보고) 합의", "무상 조건/면책 범위 정리(필요 시)"],
      },
      devReq: {
        ja: ["β向け性能/仕様の説明資料", "禁止条件/運用注意"],
        ko: ["β 대상 성능/사양 설명자료", "금지 조건/운용 주의사항"],
      },
      qaReq: {
        ja: ["評価 기준/判定 관점(初期) 공유", "出荷条件 문구 확인"],
        ko: ["평가 기준/판정 관점(초기) 공유", "출하 조건 문구 확인"],
      },
      nextGate: {
        ja: ["要求仕様・評価計画が合意済", "社内承認 완료"],
        ko: ["요구사양/평가계획 합의 완료", "사내 승인 완료"],
      },
    },
  },

  {
    id: "s5",
    short: { ja: "設計試作", ko: "설계시작" },
    title: { ja: "設計試作（設計審査/DR）", ko: "설계 시작(설계심사/DR)" },
    meta: { ja: "設計妥当性 판단", ko: "설계 타당성 판단" },
    rule: {
      purpose: {
        ja: ["設計の妥当性確認（性能/信頼性/製造性）"],
        ko: ["설계 타당성 확인(성능/신뢰성/제조성)"],
      },
      must: {
        ja: ["設計レビュー/試験結果の記録", "仕様変更はルールに沿って管理"],
        ko: ["설계 리뷰/시험 결과 기록", "사양 변경은 룰에 따라 관리"],
      },
      gate: {
        ja: ["開発部門長 승인(設計審査)"],
        ko: ["개발 부문장 승인(설계 심사)"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客 요구 변경을 즉시 공유", "일정 단축 요구 시 리스크를 숫자로 설명", "“変更はいつまで 가능”을 합의"],
        ko: ["고객 요구 변경 즉시 공유", "일정 단축 요구 시 리스크를 수치로 설명", "‘변경은 언제까지 가능’ 합의"],
      },
      devReq: {
        ja: ["最新版仕様書/要件 대응표", "試験 결과 요약(OK/NG/リスク)", "次 단계 일정 확정"],
        ko: ["최신 사양서/요건 대응표", "시험 결과 요약(OK/NG/리스크)", "다음 단계 일정 확정"],
      },
      qaReq: {
        ja: ["信頼性/リスク評価の進捗", "特採 관점(해당 시) 체크"],
        ko: ["신뢰성/리스크 평가 진행", "특채 관점(해당 시) 체크"],
      },
      nextGate: {
        ja: ["仕様が固まり、設計審査承認が取れる"],
        ko: ["사양이 고정되고 설계 심사 승인이 가능"],
      },
    },
  },

  {
    id: "s6",
    short: { ja: "サンプル", ko: "샘플" },
    title: { ja: "サンプル品販売決定会議", ko: "샘플품 판매 결정 회의" },
    meta: { ja: "有償/条件 통제", ko: "유상/조건 통제" },
    rule: {
      purpose: {
        ja: ["サンプル品（有償）として販売する可否判断"],
        ko: ["샘플품(유상) 판매 가능 여부 판단"],
      },
      must: {
        ja: ["販売条件/保証範囲/免責の明確化", "議事録/承認を保管"],
        ko: ["판매 조건/보증 범위/면책 명확화", "회의록/승인 보관"],
      },
      gate: {
        ja: ["事業部長 승인", "販売条件 확정"],
        ko: ["사업부장 승인", "판매 조건 확정"],
      },
    },
    sales: {
      salesActions: {
        ja: ["価格/納期/支払条件を確定", "クレーム時の扱い(交換/解析費 등) 합의", "顧客の用途/条件 변경 시 재승인 필요를 안내"],
        ko: ["가격/납기/지불 조건 확정", "클레임 시 처리(교환/분석비 등) 합의", "용도/조건 변경 시 재승인 필요 안내"],
      },
      devReq: {
        ja: ["サンプルの性能範囲(できる/できない)", "顧客Q&A用の技術メモ", "評価 보고 포맷(가능하면)"],
        ko: ["샘플 성능 범위(가능/불가)", "고객 Q&A용 기술 메모", "평가 보고 포맷(가능 시)"],
      },
      qaReq: {
        ja: ["保証/免責 문구 확인", "特採 필요 여부/조건", "出荷判정 기준(간단)"],
        ko: ["보증/면책 문구 확인", "특채 필요 여부/조건", "출하 판정 기준(간단)"],
      },
      nextGate: {
        ja: ["有償条件が文書化되고 승인 완료", "用途/条件이 고정됨"],
        ko: ["유상 조건 문서화 + 승인 완료", "용도/조건이 고정됨"],
      },
    },
  },

  {
    id: "s7",
    short: { ja: "生試", ko: "생시" },
    title: { ja: "生産試作 / 生試性能確認会議", ko: "생산시작 / 생시 성능확인 회의" },
    meta: { ja: "量産 가능성 확인", ko: "양산 가능성 확인" },
    rule: {
      purpose: {
        ja: ["生産試作で量産性/品質を確認し、次工程へ進む判断"],
        ko: ["생산 시제품으로 양산성/품질 확인 후 다음 단계 판단"],
      },
      must: {
        ja: ["試作 결과/課題/対策を記録", "関係部門合意を取り付ける"],
        ko: ["시작 결과/과제/대책 기록", "관계부서 합의 확보"],
      },
      gate: {
        ja: ["生試性能確認会議で合意"],
        ko: ["생시 성능확인 회의에서 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客 일정(라인 투입)과 내부 일정 정합", "量産 전환 시점의 발주/Forecast 확보", "초기 불량 대응 체계 공유"],
        ko: ["고객 일정(라인 투입)과 내부 일정 정합", "양산 전환 시점 발주/Forecast 확보", "초기 불량 대응 체계 공유"],
      },
      devReq: {
        ja: ["生試 결과 요약(安定性/ばらつき)", "残課題と対策スケジュール", "量試로 넘어갈 조건"],
        ko: ["생시 결과 요약(안정성/편차)", "잔여 과제와 대책 일정", "양시로 넘어갈 조건"],
      },
      qaReq: {
        ja: ["品質リスク評価/重点管理ポイント", "出荷判정/検査 항목(요약)"],
        ko: ["품질 리스크 평가/중점 관리 포인트", "출하 판정/검사 항목(요약)"],
      },
      nextGate: {
        ja: ["量産移行の見通しが立つ", "顧客/社内 일정 합의"],
        ko: ["양산 이행 전망 확보", "고객/사내 일정 합의"],
      },
    },
  },

  {
    id: "s8",
    short: { ja: "販売決定", ko: "판매결정" },
    title: { ja: "新製品販売決定会議", ko: "신제품 판매 결정 회의" },
    meta: { ja: "販売 개시 판단", ko: "판매 개시 판단" },
    rule: {
      purpose: {
        ja: ["販売開始の可否判断（条件/供給体制/品質）"],
        ko: ["판매 개시 가능 여부 판단(조건/공급체계/품질)"],
      },
      must: {
        ja: ["価格/供給/サポート体制の確定", "販売資料整備"],
        ko: ["가격/공급/서포트 체계 확정", "판매 자료 정비"],
      },
      gate: {
        ja: ["事業部長 승인"],
        ko: ["사업부장 승인"],
      },
    },
    sales: {
      salesActions: {
        ja: ["価格表/見積조건 확정", "顧客向け 안내 문서 정리", "初期 품질 문의 창구/에스컬레이션 정의"],
        ko: ["가격표/견적 조건 확정", "고객 안내 문서 정리", "초기 품질 문의 창구/에스컬레이션 정의"],
      },
      devReq: {
        ja: ["最終仕様書", "FAQ/制約条件まとめ", "評価波形/推奨条件(가능 범위)"],
        ko: ["최종 사양서", "FAQ/제약 조건 정리", "평가 파형/권장 조건(가능 범위)"],
      },
      qaReq: {
        ja: ["初期流動管理の計画", "重大不良時の対応ルール"],
        ko: ["초기 유동 관리 계획", "중대 불량 시 대응 룰"],
      },
      nextGate: {
        ja: ["販売開始アナウンス可能な状態", "社内支援体制가 명확"],
        ko: ["판매 개시 공지 가능한 상태", "사내 지원 체계 명확"],
      },
    },
  },

  {
    id: "s9",
    short: { ja: "量試", ko: "양시" },
    title: { ja: "量産試作 / 量試性能確認会議", ko: "양산시작 / 양시 성능확인 회의" },
    meta: { ja: "量産移行 판단", ko: "양산 이행 판단" },
    rule: {
      purpose: {
        ja: ["量産試作で量産移行の最終判断"],
        ko: ["양산 시제품으로 양산 이행 최종 판단"],
      },
      must: {
        ja: ["量産条件/検査/供給 안정성을 확인"],
        ko: ["양산 조건/검사/공급 안정성 확인"],
      },
      gate: {
        ja: ["量試性能確認会議で合意"],
        ko: ["양시 성능확인 회의에서 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: ["量産Forecast/PO 계획 확보", "納期/供給能力に合わせた 고객 커뮤니케이션", "초기 양산 불량 발생 시 대응 루트 사전 공유"],
        ko: ["양산 Forecast/PO 계획 확보", "납기/공급능력에 맞춘 고객 커뮤니케이션", "초기 양산 불량 대응 루트 사전 공유"],
      },
      devReq: {
        ja: ["量産条件 최종판(推奨 운용)", "공정 안정성 데이터(핵심)"],
        ko: ["양산 조건 최종본(권장 운용)", "공정 안정성 데이터(핵심)"],
      },
      qaReq: {
        ja: ["検査 기준/출하 판정 최종", "初期流動の監視項目"],
        ko: ["검사 기준/출하 판정 최종", "초기 유동 모니터링 항목"],
      },
      nextGate: {
        ja: ["量産移行Go/NoGoが確定", "顧客供給計画과 내부 체계 정합"],
        ko: ["양산 이행 Go/NoGo 확정", "고객 공급 계획과 내부 체계 정합"],
      },
    },
  },

  {
    id: "s10",
    short: { ja: "量産初期", ko: "양산초기" },
    title: { ja: "量産（初期）/ 新製品販売レビュー", ko: "양산(초기)/ 신제품 판매 리뷰" },
    meta: { ja: "初期品質の監視", ko: "초기 품질 모니터링" },
    rule: {
      purpose: {
        ja: ["販売開始後の初期品質/市場状況をレビュー"],
        ko: ["판매 개시 후 초기 품질/시장 상황 리뷰"],
      },
      must: {
        ja: ["市場品質情報を集約し、再発防止を回す"],
        ko: ["시장 품질 정보를 집약하고 재발방지 수행"],
      },
      gate: {
        ja: ["レビュー（承認ではなく報告/確認の位置づけ）"],
        ko: ["리뷰(승인이 아니라 보고/확인 성격)"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客 불만/이상 징후를 즉시 수집", "事実/推定を 분리해 보고", "비슷한 고객/라인에 사전 주의 환기(필요시)"],
        ko: ["고객 불만/이상 징후 즉시 수집", "사실/추정을 분리해 보고", "유사 고객/라인에 사전 주의 환기(필요 시)"],
      },
      devReq: {
        ja: ["原因解析 지원", "暫定対策/恒久対策案"],
        ko: ["원인 분석 지원", "임시/영구 대책안"],
      },
      qaReq: {
        ja: ["クレーム判断/対応方針", "再発防止 문서화"],
        ko: ["클레임 판단/대응 방침", "재발방지 문서화"],
      },
      nextGate: {
        ja: ["初期流動が落ち着き、定常運用へ"],
        ko: ["초기 유동이 안정되어 정규 운용으로"],
      },
    },
  },

  {
    id: "s11",
    short: { ja: "定常", ko: "정규" },
    title: { ja: "量産（定常）/ 市場品質管理", ko: "양산(정규)/ 시장품질관리" },
    meta: { ja: "安定供給/改善", ko: "안정공급/개선" },
    rule: {
      purpose: {
        ja: ["市場品質の監視と継続改善", "変更は変更プロセスに従う"],
        ko: ["시장 품질 모니터링 및 지속 개선", "변경은 변경 프로세스 준수"],
      },
      must: {
        ja: ["変更管理/品質記録の継続", "重大問題はエスカレーション"],
        ko: ["변경관리/품질 기록 지속", "중대 문제 시 에스컬레이션"],
      },
      gate: {
        ja: ["定常運用（必要に応じて変更審査/会議）"],
        ko: ["정규 운용(필요 시 변경 심사/회의)"],
      },
    },
    sales: {
      salesActions: {
        ja: ["価格/納期/供給の継続管理", "顧客の用途変更兆候を早期検知", "変更要求は正式プロセスへ載せる"],
        ko: ["가격/납기/공급 지속 관리", "고객 용도 변경 징후 조기 탐지", "변경 요구는 정식 프로세스로 태움"],
      },
      devReq: {
        ja: ["改善 요청의 영향/리스크 평가", "대체안/스케줄"],
        ko: ["개선 요청 영향/리스크 평가", "대체안/일정"],
      },
      qaReq: {
        ja: ["市場クレーム傾向 분석", "品質指標/監視 항목 공유"],
        ko: ["시장 클레임 경향 분석", "품질 지표/모니터링 항목 공유"],
      },
      nextGate: {
        ja: ["変更がある場合、変更審査の条件が揃う"],
        ko: ["변경이 있을 경우 변경심사 조건이 갖춰짐"],
      },
    },
  },

  {
    id: "s12",
    short: { ja: "終売", ko: "종료" },
    title: { ja: "生産終了確認会議", ko: "생산 종료 확인 회의" },
    meta: { ja: "終売/代替提案", ko: "종료/대체 제안" },
    rule: {
      purpose: {
        ja: ["生産終了の妥当性確認と顧客影響を管理"],
        ko: ["생산 종료 타당성 확인 및 고객 영향 관리"],
      },
      must: {
        ja: ["在庫/代替/サポート 종료 계획 정리", "顧客通知と記録保管"],
        ko: ["재고/대체/지원 종료 계획 정리", "고객 통지 및 기록 보관"],
      },
      gate: {
        ja: ["生産終了確認会議で合意"],
        ko: ["생산 종료 확인 회의에서 합의"],
      },
    },
    sales: {
      salesActions: {
        ja: ["顧客へ終売通知（時期/最終発注）", "代替品ロードマップ提示", "最後の需給調整(在庫/納期)"],
        ko: ["고객에 종료 공지(시기/최종 발주)", "대체품 로드맵 제시", "마지막 수급 조정(재고/납기)"],
      },
      devReq: {
        ja: ["代替品の技術差分/移行支援範囲", "サポート 종료 시점"],
        ko: ["대체품 기술 차분/이행 지원 범위", "지원 종료 시점"],
      },
      qaReq: {
        ja: ["残存リスク/回収要否 판단", "終売後クレーム対応 룰"],
        ko: ["잔존 리스크/회수 필요 여부 판단", "종료 후 클레임 대응 룰"],
      },
      nextGate: {
        ja: ["顧客影響 최소화 계획이 확정"],
        ko: ["고객 영향 최소화 계획 확정"],
      },
    },
  },
];

// -------------------------------
// DOM helpers
// -------------------------------
const $ = (sel) => document.querySelector(sel);
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

// -------------------------------
// Render
// -------------------------------
function applyUIText() {
  const t = TEXT[UI.lang];
  document.documentElement.lang = UI.lang === "ja" ? "ja" : "ko";

  $("#uiTitle").textContent = t.title;
  $("#uiSub").textContent = t.sub;
  $("#heroH1").textContent = t.heroH1;
  $("#heroP").textContent = t.heroP;
  $("#heroNote").textContent = t.heroNote;
  $("#tlTitle").textContent = t.tlTitle;
  $("#tlHint").textContent = t.tlHint;
  $("#stepsTitle").textContent = t.stepsTitle;
  $("#footerText").textContent = t.footer;

  $("#langLabel").textContent = UI.lang === "ja" ? "日本語" : "한국어";
  $("#langAlt").textContent = UI.lang === "ja" ? "한국어" : "日本語";
}

function buildTimeline() {
  const t = TEXT[UI.lang];
  const wrap = $("#timelineChips");
  wrap.innerHTML = "";

  STEPS.forEach((s, idx) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.dataset.to = s.id;
    chip.innerHTML =
      `${escapeHtml(t.chipStep)} ${idx} · ${escapeHtml(s.short[UI.lang])}` +
      `<small>${escapeHtml(s.title[UI.lang])}</small>`;
    wrap.appendChild(chip);
  });
}

function kvBlock(title, items) {
  const ul = items?.length
    ? `<ul>${items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
    : `<ul><li class="muted">—</li></ul>`;
  return `<div class="kv"><h4>${escapeHtml(title)}</h4>${ul}</div>`;
}

function renderStepCard(step, idx) {
  const t = TEXT[UI.lang];
  const activeTab = UI.tabByStep.get(step.id) || "rule";

  const ruleHTML =
    kvBlock(t.secPurpose, step.rule.purpose[UI.lang]) +
    kvBlock(t.secMust, step.rule.must[UI.lang]) +
    kvBlock(t.secGate, step.rule.gate[UI.lang]);

  const salesHTML =
    kvBlock(t.secSales, step.sales.salesActions[UI.lang]) +
    kvBlock(t.secDev, step.sales.devReq[UI.lang]) +
    kvBlock(t.secQa, step.sales.qaReq[UI.lang]) +
    kvBlock(t.secNext, step.sales.nextGate[UI.lang]);

  const contentHTML = activeTab === "rule" ? ruleHTML : salesHTML;

  return `
    <article class="card step-card" id="${escapeHtml(step.id)}" data-step="${escapeHtml(step.id)}">
      <div class="step-head">
        <div>
          <div class="step-title">${escapeHtml(TEXT[UI.lang].chipStep)} ${idx} · ${escapeHtml(step.title[UI.lang])}</div>
          <div class="step-meta">${escapeHtml(step.meta[UI.lang])}</div>
        </div>
        <div class="step-actions">
          <span class="pilltag">${escapeHtml(step.short[UI.lang])}</span>
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

function renderSteps() {
  const wrap = $("#stepsWrap");
  const q = UI.query.trim().toLowerCase();

  const filtered = !q
    ? STEPS
    : STEPS.filter((s) => {
        const blob =
          [
            s.short.ja, s.short.ko, s.title.ja, s.title.ko, s.meta.ja, s.meta.ko,
            ...s.rule.purpose.ja, ...s.rule.purpose.ko,
            ...s.rule.must.ja, ...s.rule.must.ko,
            ...s.rule.gate.ja, ...s.rule.gate.ko,
            ...s.sales.salesActions.ja, ...s.sales.salesActions.ko,
            ...s.sales.devReq.ja, ...s.sales.devReq.ko,
            ...s.sales.qaReq.ja, ...s.sales.qaReq.ko,
            ...s.sales.nextGate.ja, ...s.sales.nextGate.ko,
          ]
            .join(" ")
            .toLowerCase();
        return blob.includes(q);
      });

  wrap.innerHTML = filtered.map((s, idx) => renderStepCard(s, idx)).join("");
}

function rerenderAll() {
  applyUIText();
  buildTimeline();
  renderSteps();
}

// -------------------------------
// Events
// -------------------------------
function onClick(e) {
  const chip = e.target.closest(".chip");
  if (chip?.dataset?.to) {
    const id = chip.dataset.to;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const tab = e.target.closest(".tab");
  if (tab) {
    const card = tab.closest(".step-card");
    const stepId = card?.dataset?.step;
    const to = tab.dataset.tab; // rule | sales
    if (!stepId || (to !== "rule" && to !== "sales")) return;

    UI.tabByStep.set(stepId, to);
    // Rerender only this card's content (simple + robust: rerender all)
    renderSteps();
    return;
  }

  const langBtn = e.target.closest("#langBtn");
  if (langBtn) {
    UI.lang = UI.lang === "ja" ? "ko" : "ja";
    rerenderAll();
    return;
  }
}

function onInput(e) {
  if (e.target?.id === "searchInput") {
    UI.query = e.target.value || "";
    renderSteps();
  }
}

// -------------------------------
// Init
// -------------------------------
document.addEventListener("click", onClick);
document.addEventListener("input", onInput);

rerenderAll();
