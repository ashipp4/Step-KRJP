// --- i18n dictionary (JA default, KR toggle) ---
const I18N = {
  ja: {
    site_title: "IJ 商品化プロセス（ISO Step）",
    site_subtitle: "ステップ別：目的 / 必須対応 / ゲート条件 / 参考",
    jump_to_timeline: "タイムラインへ",

    hero_headline: "「やること」を迷わないためのステップ地図",
    hero_lead: "商品化の各会議体（Gate）で“何を準備・提出・確認するか”を、実務チェックリストとして一列に整理。",

    hero_card1_title: "使い方",
    hero_card1_body: "自分の案件の「今のステップ」を選び、必須対応と次ゲート条件を確認する。",
    hero_card2_title: "注意ポイント",
    hero_card2_body: "α/βは特採が必要、サンプル品は有償＝製品同等の責務が発生。DR2以降の変更は変更プロセス。",
    hero_card3_title: "更新",
    hero_card3_body: "社内運用に合わせて文言・担当・書式（チェックリスト項目）を随時更新してOK。",

    note_tag: "出典",
    note_text: "「商品化プロセス教育（異動者向け）QM11版対応（2025.04）」をベースに要点化。",

    timeline_title: "全体タイムライン（Gate）",
    timeline_subtitle: "各ステップは「目的 → 必須対応 → ゲート条件 → 営業/実務メモ」の順で記載。",

    quickcheck_title: "クイック注意事項（超重要）",
    quickcheck_subtitle: "事故りやすいポイントだけ抜粋。",

    qc_1_title: "α / β（無償・免責）",
    qc_1_li1: "出荷時は「特採申請書」を品証部へ提出（必須）。",
    qc_1_li2: "評価結果が無い状態で次ゲートに進めない（原則）。",

    qc_2_title: "サンプル品（有償）",
    qc_2_li1: "有償提供＝製品と同等の責務（保証・法規対応など）が発生。",
    qc_2_li2: "通常は特採不要（例外：特採品扱い等）。",

    qc_3_title: "DR2以降の変更",
    qc_3_li1: "設計試作性能確認（DR2）承認後の変更は変更プロセス対象。",
    qc_3_li2: "変更中の試作品の外部提供は、品証部のリリース承認が必要。",

    qc_4_title: "販売決定",
    qc_4_li1: "前提は「適正な量産品質」＋販売/CS準備完了。",
    qc_4_li2: "販売後1年以内にレビューし、次企画へフィードバック。",

    footer_text: "必要なら、このページをそのまま社内Wiki/共有にも転用できます。",
    back_to_top: "上へ",
  },

  ko: {
    site_title: "IJ 상품화 프로세스(ISO Step)",
    site_subtitle: "단계별: 목적 / 필수 대응 / 게이트 조건 / 참고",
    jump_to_timeline: "타임라인으로",

    hero_headline: "‘내가 뭘 해야 하는지’ 헷갈리지 않게 만드는 단계 지도",
    hero_lead: "상품화 각 회의체(Gate)에서 ‘무엇을 준비/제출/확인해야 하는지’를 실무 체크리스트로 한 줄로 정리했습니다.",

    hero_card1_title: "사용법",
    hero_card1_body: "내案件의 ‘현재 단계’를 고르고, 필수 대응과 다음 게이트 조건을 확인합니다.",
    hero_card2_title: "주의 포인트",
    hero_card2_body: "α/β는 특채(特採) 필요, 샘플품은 유상=제품과 동일 책임 발생. DR2 이후 변경은 변경 프로세스 대상.",
    hero_card3_title: "업데이트",
    hero_card3_body: "사내 운영에 맞게 문구/담당/체크리스트 항목을 수시로 업데이트해도 됩니다.",

    note_tag: "출처",
    note_text: "‘상품화 프로세스 교육(이동자용) QM11판 대응(2025.04)’ 내용을 바탕으로 요약했습니다.",

    timeline_title: "전체 타임라인(Gate)",
    timeline_subtitle: "각 단계는 ‘목적 → 필수 대응 → 게이트 조건 → 실무 메모’ 순으로 정리했습니다.",

    quickcheck_title: "퀵 체크(매우 중요)",
    quickcheck_subtitle: "사고 나기 쉬운 포인트만 뽑았습니다.",

    qc_1_title: "α / β(무상·면책)",
    qc_1_li1: "출하 시 ‘특채 신청서’를 품증부에 제출(필수).",
    qc_1_li2: "평가 결과 없이 다음 게이트로 진행 불가(원칙).",

    qc_2_title: "샘플품(유상)",
    qc_2_li1: "유상 제공=제품과 동일 책임(보증/법규 대응 등) 발생.",
    qc_2_li2: "통상 특채 불필요(예외: 특채품 취급 등).",

    qc_3_title: "DR2 이후 변경",
    qc_3_li1: "설계시작 성능확인(DR2) 승인 후 변경은 변경 프로세스 대상.",
    qc_3_li2: "변경 중 시제품 외부 제공은 품증부 릴리즈 승인이 필요.",

    qc_4_title: "판매 결정",
    qc_4_li1: "전제는 ‘적정 양산 품질’ + 판매/CS 준비 완료.",
    qc_4_li2: "판매 후 1년 이내 리뷰하여 다음 기획에 피드백.",

    footer_text: "원하면 이 페이지를 그대로 사내 위키/공유 문서로 전용해도 됩니다.",
    back_to_top: "위로",
  }
};

// --- Steps data (JA/KR) ---
const STEPS = [
  {
    key: "proposal",
    badge: { ja: "企画", ko: "기획" },
    title: { ja: "新製品提案会議", ko: "신제품 제안회의" },
    purpose: {
      ja: "新製品の先行開発着手の提案と各部門への周知。",
      ko: "신제품 선행개발 착수 제안 및 각 부문 공지."
    },
    must: {
      ja: [
        "開発ロードマップに記載後、原則1Q以内に提案会議または企画会議を実施。",
        "提案する製品による事業構想（狙い/用途/顧客想定）を提示。",
        "α品出荷判定会議を予定する場合、事前に提案会議の開催が必須。"
      ],
      ko: [
        "개발 로드맵 반영 후 원칙적으로 1Q 이내 제안회의 또는 기획회의 실시.",
        "제품 사업구상(목표/용도/고객 가정)을 제시.",
        "α품 출하 판정회의 예정 시, 제안회의 선행 개최가 필수."
      ]
    },
    gate: {
      ja: ["製品化の意図が明確（コンセプト案など）", "社内共有・認識合わせができていること"],
      ko: ["제품화 의도 명확(컨셉안 등)", "사내 공유/인식 정렬 완료"]
    },
    memo: {
      ja: "営業：顧客に提案できる状態（コンセプト案）が目安。",
      ko: "영업: 고객에 제안 가능한 수준(컨셉안)이 개최 기준."
    }
  },
  {
    key: "alpha",
    badge: { ja: "無償", ko: "무상" },
    title: { ja: "α品出荷判定会議", ko: "α품 출하 판정회의" },
    purpose: {
      ja: "仮説検証のためのα品（免責・無償）の出荷可否判断。",
      ko: "가설 검증용 α품(면책·무상) 출하 가능 여부 판단."
    },
    must: {
      ja: [
        "免責品・製品化未定である前提を明確化。",
        "出荷時は特採申請書を品証部へ提出。",
        "提供先と共に評価・検証を行い、結果無しで次ゲートへ進めない。"
      ],
      ko: [
        "면책품·제품화 미정 전제를 명확히 문서화.",
        "출하 시 특채(特採) 신청서를 품증부에 제출.",
        "제공처와 함께 평가/검증 수행, 결과 없이 다음 게이트 진행 불가."
      ]
    },
    gate: {
      ja: ["新製品提案会議でα品出荷予定を報告済み", "評価・検証計画があること"],
      ko: ["신제품 제안회의에서 α품 출하 예정 보고 완료", "평가/검증 계획 존재"]
    },
    memo: {
      ja: "社内顧客限定で試作費振替などの有償提供は可（運用条件に注意）。",
      ko: "사내 고객 한정으로 시비용 대체 등 유상 제공 가능(운용 조건 주의)."
    }
  },
  {
    key: "plan",
    badge: { ja: "承認", ko: "승인" },
    title: { ja: "新製品企画会議", ko: "신제품 기획회의" },
    purpose: {
      ja: "製品化開発着手（事業化）の可否判断（事業性確認）。",
      ko: "제품화 개발 착수(사업화) 가능 여부 판단(사업성 확인)."
    },
    must: {
      ja: [
        "事業性（市場/顧客/収益性/リスク）を説明できる状態にする。",
        "承認後、開発は要求仕様の明確化、販売は“開発中品”として提案可能。"
      ],
      ko: [
        "사업성(시장/고객/수익성/리스크)을 설명 가능한 상태로 준비.",
        "승인 후 개발은 요구사양 명확화, 영업은 ‘개발중 제품’으로 제안 가능."
      ]
    },
    gate: {
      ja: ["事業部長承認で事業化着手", "要求仕様へ落とし込める見通し"],
      ko: ["사업부장 승인으로 사업화 착수", "요구사양으로 구체화 가능한 수준"]
    },
    memo: {
      ja: "ここから“社外への提案”がやりやすくなる（ただし免責/取扱条件は別途）。",
      ko: "여기부터 대외 제안이 쉬워짐(단, 면책/취급 조건은 별도)."
    }
  },
  {
    key: "dr1",
    badge: { ja: "設計", ko: "설계" },
    title: { ja: "設計審査（DR1）", ko: "설계 심사(DR1)" },
    purpose: {
      ja: "設計図面/設計処方が設計仕様を満足するための要素を漏れなく考慮しているか審査。",
      ko: "설계도면/처방이 설계사양 충족에 필요한 요소를 누락 없이 반영했는지 심사."
    },
    must: {
      ja: [
        "顧客要求および法規制が設計仕様書に漏れなく反映されていることを再確認。",
        "企画会議以降にα出荷承認した場合、その評価結果を報告。"
      ],
      ko: [
        "고객 요구 및 법규가 설계사양서에 누락 없이 반영됐는지 재확인.",
        "기획회의 이후 α 출하 승인된 경우, 그 평가 결과를 보고."
      ]
    },
    gate: {
      ja: ["設計審査に必要な情報が揃っている", "重大な抜け/矛盾がない"],
      ko: ["설계 심사에 필요한 정보 확보", "중요 누락/모순 없음"]
    },
    memo: {
      ja: "要求事項のトレーサビリティ（どこに反映したか）が大事。",
      ko: "요구사항 추적성(어디에 반영했는지)이 중요."
    }
  },
  {
    key: "beta",
    badge: { ja: "無償", ko: "무상" },
    title: { ja: "β品出荷判定会議", ko: "β품 출하 판정회의" },
    purpose: {
      ja: "顧客要望の明確化のためのβ品（免責・無償）の提供可否判断。",
      ko: "고객 요구 명확화를 위한 β품(면책·무상) 제공 가능 여부 판단."
    },
    must: {
      ja: [
        "企画会議でβ品出荷予定を報告済みであること。",
        "出荷時は特採申請書を品証部へ提出。",
        "予定評価項目の結果無しで設計試作性能確認（DR2）へ進めない。"
      ],
      ko: [
        "기획회의에서 β품 출하 예정 보고가 완료되어야 함.",
        "출하 시 특채 신청서를 품증부에 제출.",
        "예정 평가항목 결과 없이 DR2로 진행 불가."
      ]
    },
    gate: {
      ja: ["仕様が固まった試作品として提供できる", "評価項目・回収計画が明確"],
      ko: ["사양 고정 시제품으로 제공 가능", "평가 항목/결과 회수 계획 명확"]
    },
    memo: {
      ja: "α＝幅広い条件で仮説検証、β＝固めた仕様で適合確認、の使い分け。",
      ko: "α=폭넓은 조건 가설검증, β=고정 사양 적합확인으로 구분."
    }
  },
  {
    key: "dr2",
    badge: { ja: "承認", ko: "승인" },
    title: { ja: "設計試作性能確認会議（DR2）", ko: "설계시작 성능확인회의(DR2)" },
    purpose: {
      ja: "設計試作品が性能・品質目標を達成していること等により設計妥当性を確認し、生産試作へ移行判断。",
      ko: "설계 시제품이 성능/품질 목표를 달성했는지로 설계 타당성 확인, 생산시작으로 이동 판단."
    },
    must: {
      ja: [
        "承認後の変更は変更プロセス対象（自由な処方変更は不可）。",
        "品証部門長の承認が必要になる（変更管理）。",
        "承認ポイント：①設計仕様（顧客要望含む）を満たす ②設計完了 ③生産設備準備完了。"
      ],
      ko: [
        "승인 후 변경은 변경 프로세스 대상(개발부서 단독 변경 불가).",
        "품증부문장 승인 필요(변경관리).",
        "승인 포인트: ①설계사양(고객요구 포함) 충족 ②설계 완료 ③생산설비 준비 완료."
      ]
    },
    gate: {
      ja: ["評価結果が設計仕様の全要求を満たす", "変更管理に移行する覚悟"],
      ko: ["평가 결과가 설계사양 전체 요구를 충족", "변경관리 체계로 전환 준비"]
    },
    memo: {
      ja: "ここが“変更プロセス開始ライン”。後戻りコストが跳ねる。",
      ko: "여기가 ‘변경 프로세스 시작 라인’. 이후 되돌림 비용 급증."
    }
  },
  {
    key: "sample",
    badge: { ja: "有償", ko: "유상" },
    title: { ja: "サンプル品販売決定会議", ko: "샘플품 판매 결정회의" },
    purpose: {
      ja: "販売機会追求等の理由で、設計/生産試作品を販売する可否判断。",
      ko: "판매 기회 확보 등의 이유로 설계/생산 시제품을 유상 판매할지 판단."
    },
    must: {
      ja: [
        "有償提供が可能になる一方、製品と同じ責務（保証・法規対応など）が発生。",
        "通常は特採処置不要（ただし特採品扱いなど例外あり）。"
      ],
      ko: [
        "유상 제공 가능. 단, 제품과 동일 책임(보증/법규 대응 등) 발생.",
        "통상 특채 불필요(단, 특채품 취급 등 예외 가능)."
      ]
    },
    gate: {
      ja: ["責務（保証/規制）を理解し、条件を整備できている", "販売部門主導で判断"],
      ko: ["책임(보증/규제)을 이해하고 조건을 정비", "영업부문 주도로 판단"]
    },
    memo: {
      ja: "“お金をもらう”瞬間から、説明責任のレベルが上がる。",
      ko: "‘돈을 받는 순간’부터 설명 책임 레벨이 올라감."
    }
  },
  {
    key: "pilot",
    badge: { ja: "生産", ko: "생산" },
    title: { ja: "生産試作性能確認会議", ko: "생산시작 성능확인회의" },
    purpose: {
      ja: "生産部門/仕入先が作った製品が性能・品質・コスト等の目標達成を確認し、量産移行可否判断。",
      ko: "생산부문/공급처 제품이 성능·품질·코스트 목표를 달성했는지 확인하고 양산 이동 판단."
    },
    must: {
      ja: [
        "宿題事項はすべて終了させる（残課題ゼロ化）。",
        "量産試作レベル区分（0/1/2）を確認し、必要なら量産試作へ。"
      ],
      ko: [
        "숙제사항(남은 과제) 전부 종료(잔과제 0).",
        "양산시작 레벨(0/1/2) 확인 후 필요 시 양산시작 단계로 이동."
      ]
    },
    gate: {
      ja: ["量産可能な品質が確保できた", "生産オーナーへ移管"],
      ko: ["양산 가능한 품질 확보", "생산 오너로 이관"]
    },
    memo: {
      ja: "承認後のプロセスオーナーは生産部門（委託先含む）。",
      ko: "승인 후 프로세스 오너는 생산부문(위탁 포함)."
    }
  },
  {
    key: "sell",
    badge: { ja: "販売", ko: "판매" },
    title: { ja: "新製品販売決定会議", ko: "신제품 판매결정회의" },
    purpose: {
      ja: "販売準備が整っていることを確認し、販売可否判断。",
      ko: "판매 준비 완료 여부를 확인하고 판매 가능 여부 판단."
    },
    must: {
      ja: [
        "前提は“適正な量産品質”。",
        "販売/CS準備、品質要求を満足したサービス提供準備を確認。"
      ],
      ko: [
        "전제는 ‘적정 양산 품질’.",
        "판매/CS 준비, 품질 요구를 만족하는 서비스 제공 준비 확인."
      ]
    },
    gate: {
      ja: ["販売・出荷開始の決定", "レビュー開催予定の宣言（運用）"],
      ko: ["판매/출하 시작 결정", "리뷰 개최 예정 선언(운용)"]
    },
    memo: {
      ja: "販売開始＝対外責任MAX。資料・説明・対応フローを固める。",
      ko: "판매 시작=대외 책임 MAX. 자료/설명/대응 플로우 고정."
    }
  },
  {
    key: "change",
    badge: { ja: "変更", ko: "변경" },
    title: { ja: "変更プロセス（DR2以降）", ko: "변경 프로세스(DR2 이후)" },
    purpose: {
      ja: "変更を計画的に評価・検証し、悪影響防止と市場品質確保。",
      ko: "변경을 계획적으로 평가/검증하여 악영향 방지 및 시장 품질 확보."
    },
    must: {
      ja: [
        "変更提案会議→試作・評価→本設変（承認：品証部門長）。",
        "承認前の外部提供は特採申請が必要（承認：品証部門長）。"
      ],
      ko: [
        "변경제안회의→시작/평가→본설변(승인: 품증부문장).",
        "승인 전 외부 제공은 특채 신청 필요(승인: 품증부문장)."
      ]
    },
    gate: {
      ja: ["変更内容が共有・制御されている", "リリース承認の取得"],
      ko: ["변경 내용 공유/통제", "릴리즈 승인 확보"]
    },
    memo: {
      ja: "提案者は進捗確認と制御も行う（投げっぱなし禁止）。",
      ko: "제안자는 진행 확인/통제까지 수행(던져두기 금지)."
    }
  },
  {
    key: "review",
    badge: { ja: "改善", ko: "개선" },
    title: { ja: "新製品販売レビュー", ko: "신제품 판매 리뷰" },
    purpose: {
      ja: "初期品質確認と次期製品へのフィードバック（販売後1年以内）。",
      ko: "초기 품질 확인 및 차기 제품 피드백(판매 후 1년 이내)."
    },
    must: {
      ja: [
        "初期品質（品証）と企画妥当性（企画）をレビューし報告。",
        "運用上は生産会議/月報/Q集約会での報告でも可。"
      ],
      ko: [
        "초기 품질(품증)과 기획 타당성(기획)을 리뷰하고 보고.",
        "운용상 생산회의/월보/Q집약회 보고로 대체 가능."
      ]
    },
    gate: {
      ja: ["次企画へ反映（PDCA）", "知見の共有"],
      ko: ["차기 기획 반영(PDCA)", "지식 공유"]
    },
    memo: {
      ja: "“次を強くする会議”。ここを軽視すると同じ事故が繰り返される。",
      ko: "‘다음을 강하게 만드는 회의’. 여기 약하면 같은 사고 반복."
    }
  },
  {
    key: "eol",
    badge: { ja: "終了", ko: "종료" },
    title: { ja: "生産終了確認会議", ko: "생산 종료 확인회의" },
    purpose: {
      ja: "生産終了手続きに問題が無いことを確認。",
      ko: "생산 종료 절차에 문제가 없는지 확인."
    },
    must: {
      ja: [
        "転用できない部材/設備/仕掛品の処理がある場合、管理部と協議が必須。"
      ],
      ko: [
        "전용 불가 부재/설비/재공품 처리 필요 시, 관리부와 협의 필수."
      ]
    },
    gate: {
      ja: ["処理方針が確定している", "関係者合意"],
      ko: ["처리 방침 확정", "관계자 합의"]
    },
    memo: {
      ja: "終了は“片付け”ではなく、リスク清算（在庫・契約・保証）まで含む。",
      ko: "종료는 ‘정리’가 아니라 리스크 정산(재고/계약/보증)까지 포함."
    }
  }
];

function setLang(lang) {
  document.documentElement.lang = (lang === "ja" ? "ja" : "ko");

  // swap button labels
  const label = document.getElementById("langLabel");
  const alt = document.getElementById("langAlt");
  if (lang === "ja") {
    label.textContent = "JA";
    alt.textContent = "KR";
  } else {
    label.textContent = "KR";
    alt.textContent = "JA";
  }

  // translate static labels
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const text = I18N[lang][key];
    if (typeof text === "string") el.textContent = text;
  });

  // render steps
  renderSteps(lang);

  // remember
  localStorage.setItem("lang", lang);
}

function renderSteps(lang) {
  const root = document.getElementById("steps");
  root.innerHTML = "";

  const colTitles = lang === "ja"
    ? { purpose: "目的", must: "必須対応（社内ルール）", gate: "ゲート条件 / 次へ進む条件", memo: "実務メモ" }
    : { purpose: "목적", must: "필수 대응(사내 규정)", gate: "게이트 조건/다음 단계 조건", memo: "실무 메모" };

  STEPS.forEach((s, idx) => {
    const step = document.createElement("div");
    step.className = "step";
    step.id = `step-${idx+1}`;

    const top = document.createElement("div");
    top.className = "step-top";

    const title = document.createElement("h3");
    title.className = "step-title";
    title.textContent = `${idx+1}. ${s.title[lang]}`;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = s.badge[lang];

    top.appendChild(title);
    top.appendChild(badge);

    const grid = document.createElement("div");
    grid.className = "step-grid";

    const b1 = document.createElement("div");
    b1.className = "block";
    b1.innerHTML = `<h4>${colTitles.purpose}</h4><p>${s.purpose[lang]}</p>`;

    const b2 = document.createElement("div");
    b2.className = "block";
    b2.innerHTML = `<h4>${colTitles.must}</h4>${toUL(s.must[lang])}`;

    const b3 = document.createElement("div");
    b3.className = "block";
    b3.innerHTML = `<h4>${colTitles.gate}</h4>${toUL(s.gate[lang])}<h4 style="margin-top:10px">${colTitles.memo}</h4><p>${s.memo[lang]}</p>`;

    grid.appendChild(b1);
    grid.appendChild(b2);
    grid.appendChild(b3);

    step.appendChild(top);
    step.appendChild(grid);

    root.appendChild(step);
  });
}

function toUL(items) {
  const li = items.map(x => `<li>${escapeHtml(x)}</li>`).join("");
  return `<ul>${li}</ul>`;
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// init
(function init(){
  const saved = localStorage.getItem("lang");
  const initial = (saved === "ko" || saved === "ja") ? saved : "ja";
  setLang(initial);

  document.getElementById("langBtn").addEventListener("click", () => {
    const cur = localStorage.getItem("lang") || "ja";
    setLang(cur === "ja" ? "ko" : "ja");
  });
})();
