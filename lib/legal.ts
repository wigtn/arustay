export const LEGAL_LOCALES = ['ko', 'en', 'ja', 'zh'] as const;
export type LegalLocale = (typeof LEGAL_LOCALES)[number];

export const LEGAL_LOCALE_LABELS: Record<LegalLocale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

export type LegalDoc = { title: string; markdown: string };

const PRIVACY_KO = `# 개인정보처리방침

아루스테이(이하 "회사")는 정보주체의 개인정보를 소중하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수하기 위해 개인정보처리방침을 수립·공개합니다.

회사는 본 개인정보처리방침을 통해 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 이를 보호하기 위해 어떠한 조치를 취하고 있는지 안내드립니다.

## 1. 수집하는 개인정보 항목

회사는 장기숙박 문의, 예약 확인, 결제 안내, 고객 응대 등을 위해 아래와 같은 개인정보를 수집할 수 있습니다.

- 이름
- 이메일 주소
- 전화번호
- 국적
- 숙박 희망일 또는 체크인/체크아웃 날짜
- 숙박 인원
- 방 개수
- 요청사항 또는 문의 내용

회사는 원칙적으로 결제에 필요한 카드 정보를 직접 수집하거나 저장하지 않으며, 결제는 별도의 결제 서비스 제공업체(PG사)를 통해 처리됩니다.

## 2. 개인정보의 수집 및 이용 목적

회사는 수집한 개인정보를 다음 목적 범위 내에서 이용합니다.

- 장기숙박 문의 확인
- 예약 가능 여부 확인
- 결제 링크 발송
- 예약 확정 및 관련 안내
- 고객 문의 응대
- 체크인 관련 연락
- 법령상 필요한 숙박자 관리 및 의무 이행

회사는 이용자의 사전 동의 없이 개인정보를 위 목적 범위를 초과하여 이용하지 않습니다.

## 3. 개인정보의 수집 방법

회사는 다음과 같은 방법으로 개인정보를 수집합니다.

- Google Forms를 통한 문의 및 예약 접수
- 이메일을 통한 문의 및 예약 관련 커뮤니케이션

## 4. 개인정보의 보유 및 이용기간

회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 아래의 경우에는 일정 기간 동안 개인정보를 보관할 수 있습니다.

- 단순 문의 정보: 문의 처리 완료 후 **6개월**
- 예약 및 숙박 관련 정보: 숙박 종료 또는 예약 절차 종료 후 **1년**
- 관계 법령에 따라 보관이 필요한 경우: 해당 법령에서 정한 기간 동안 보관

회사는 보관기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 해당 개인정보를 파기합니다.

## 5. 개인정보의 제3자 제공

회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.

- 이용자가 사전에 동의한 경우
- 법령에 따라 제출 의무가 있는 경우
- 공항 픽업 서비스 제공이 필요한 경우, 서비스 진행을 위해 필요한 범위 내에서 외부 기사 또는 업체에 아래 정보를 제공할 수 있습니다.
- 결제 처리 과정에서 결제 서비스 제공업체(PG사)에 필요한 정보가 제공되는 경우

회사는 개인정보를 판매하거나 임의로 제3자에게 제공하지 않습니다.

## 6. 개인정보 처리의 위탁

회사는 원활한 서비스 제공을 위해 아래와 같은 외부 서비스를 이용할 수 있습니다.

- Google Forms: 문의 및 예약 정보 수집
- Gmail: 이메일 문의 응대 및 예약 안내
- 결제 서비스 제공업체(PG사): 결제 처리

회사는 위탁계약 체결 시 개인정보 보호 관련 법령에 따라 개인정보가 안전하게 처리될 수 있도록 필요한 사항을 관리·감독합니다.

## 7. 개인정보의 국외 이전

회사는 Google Forms, Gmail 등 해외 서버 기반 서비스를 이용할 수 있으며, 이 과정에서 개인정보가 대한민국 외 지역의 서버를 통해 저장 또는 처리될 수 있습니다.

회사는 국외 이전이 발생하는 경우에도 관련 법령에 따라 개인정보가 안전하게 관리될 수 있도록 합리적인 보호조치를 취합니다.

## 8. 정보주체의 권리와 행사 방법

이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지 등을 요청할 수 있습니다.

개인정보 관련 요청은 아래 문의처를 통해 하실 수 있으며, 회사는 관련 법령에 따라 지체 없이 필요한 조치를 취하겠습니다.

다만, 법령에 따라 보관이 필요한 정보는 삭제가 제한될 수 있습니다.

## 9. 미성년자의 개인정보 보호

회사는 미성년자의 예약 또는 개인정보 제공이 필요한 경우, 보호자의 동의를 받은 후에만 관련 절차를 진행합니다.

보호자 동의는 이메일을 통해 확인할 수 있습니다.

## 10. 개인정보의 파기 절차 및 방법

회사는 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.

파기 절차 및 방법은 다음과 같습니다.

- 전자적 파일 형태의 정보: 복구 또는 재생이 불가능한 방법으로 삭제
- 종이 문서 형태의 정보: 분쇄 또는 소각

## 11. 개인정보의 안전성 확보조치

회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고자 노력합니다.

- 개인정보 접근 권한의 최소화
- 개인정보 취급자에 대한 관리
- 개인정보가 포함된 계정 및 시스템의 비밀번호 관리
- 외부 서비스 이용 시 보안 기능 점검

다만, 회사는 소규모 사업장으로서 운영 규모에 맞는 범위 내에서 개인정보 보호를 위해 합리적인 조치를 지속적으로 시행합니다.

## 12. 개인정보 보호 문의

개인정보 보호와 관련한 문의, 열람청구, 정정·삭제 요청 등은 아래 이메일로 연락해 주시기 바랍니다.

- 이메일: **arustay26@gmail.com**

회사는 이용자의 문의에 성실하게 답변하고 필요한 조치를 취하겠습니다.

## 13. 개인정보처리방침의 변경

본 개인정보처리방침은 시행일로부터 적용됩니다.

회사가 개인정보처리방침을 변경하는 경우, 변경사항은 홈페이지를 통해 공지합니다.

**시행일: 2026년 4월 27일**`;

const PRIVACY_EN = `# Privacy Policy

ARU STAY ("we," "us," or "our") values your personal information and is committed to complying with applicable privacy laws and regulations, including the Personal Information Protection Act of Korea.

This Privacy Policy explains what personal information we collect, how we use it, how we protect it, and what rights you may have regarding your personal information.

## 1. Personal Information We Collect

We may collect the following personal information for long-stay inquiries, reservation review, payment guidance, and customer support:

- Name
- Email address
- Phone number
- Nationality
- Preferred stay dates or check-in/check-out dates
- Number of guests
- Number of rooms
- Requests or inquiry details

In principle, we do not directly collect or store full card information. Payments are processed through a separate payment service provider (PG).

## 2. Purpose of Collection and Use

We use collected personal information only for the following purposes:

- Reviewing long-stay inquiries
- Confirming availability
- Sending payment links
- Confirming reservations and providing related information
- Responding to customer inquiries
- Contacting guests regarding check-in
- Fulfilling legal obligations related to guest management

We do not use personal information beyond these purposes without prior consent, unless required by law.

## 3. How We Collect Personal Information

We may collect personal information through the following channels:

- Inquiry and reservation requests submitted through Google Forms
- Email communication related to inquiries and reservations

## 4. Retention and Use Period

We retain personal information only for as long as necessary to fulfill the purposes stated above. However, we may retain certain information for the following periods:

- General inquiry information: up to **6 months** after the inquiry is resolved
- Reservation and stay-related information: up to **1 year** after the stay ends or the reservation process is completed
- Where retention is required by applicable law: for the period required by such law

Once the retention period has expired or the purpose of processing has been fulfilled, we will delete the relevant personal information without delay.

## 5. Provision of Personal Information to Third Parties

We do not provide personal information to third parties unless one of the following applies:

- You have given prior consent
- Disclosure is required by applicable law
- Your information is necessary to arrange an airport pickup service, in which case we may provide name, arrival time, and contact information to the driver or service provider
- Information is provided to a payment service provider (PG) as necessary for payment processing

We do not sell personal information or provide it to third parties for unrelated commercial purposes.

## 6. Outsourcing of Personal Information Processing

To operate our services, we may use the following external services:

- Google Forms: collection of inquiry and reservation information
- Gmail: email communication and reservation guidance
- Payment service provider (PG): payment processing

Where personal information processing is outsourced, we make reasonable efforts to ensure that such information is handled securely and in compliance with applicable laws.

## 7. Overseas Transfer of Personal Information

We may use services such as Google Forms and Gmail, which may involve the storage or processing of personal information on servers located outside Korea.

Even where overseas transfer occurs, we make reasonable efforts to ensure that personal information is handled securely in accordance with applicable laws.

## 8. Your Rights

You may request access to, correction of, deletion of, or suspension of processing of your personal information at any time.

Requests related to personal information may be submitted through the contact information below, and we will take necessary measures without undue delay in accordance with applicable laws.

Please note that deletion may be restricted where retention is required by law.

## 9. Children's Privacy

If a minor wishes to make a reservation or provide personal information, we require consent from a parent or legal guardian before proceeding.

Parental or guardian consent may be confirmed by email.

## 10. Deletion of Personal Information

When personal information is no longer needed due to expiration of the retention period or completion of the processing purpose, we will delete it without delay.

Deletion methods include:

- Electronic files: deletion in a way that makes recovery or restoration difficult
- Printed documents: shredding or disposal in a secure manner

## 11. Security Measures

We make reasonable efforts to protect personal information, including:

- Limiting access to personal information
- Managing personnel who handle personal information
- Maintaining password protection for accounts and systems containing personal information
- Reviewing the security functions of external services we use

As a small-scale accommodation business, we take reasonable and appropriate measures for our size and operation.

## 12. Contact

If you have any questions about this Privacy Policy or wish to request access, correction, or deletion of your personal information, please contact us at:

- Email: **arustay26@gmail.com**

We will do our best to respond sincerely and take appropriate action.

## 13. Changes to This Privacy Policy

This Privacy Policy becomes effective on the date stated below.

If we make changes to this Privacy Policy, we will post the updated version on our website.

**Effective Date: April 27, 2026**

This Privacy Policy is originally written in Korean. In the event of any discrepancy between language versions, the Korean version shall prevail.`;

const PRIVACY_JA = `# プライバシーポリシー

アルステイ（以下「会社」といいます）は、情報主体の個人情報を大切に考え、「個人情報保護法」など関連法令を遵守するため、プライバシーポリシーを策定し公開します。

会社は、本プライバシーポリシーを通じて、利用者が提供する個人情報がどのような目的と方法で利用されているのか、またそれを保護するためにどのような措置を講じているのかを案内します。

## 1. 収集する個人情報の項目

会社は、長期滞在のお問い合わせ、予約確認、決済案内、お客様対応などのため、以下のような個人情報を収集する場合があります。

- 氏名
- メールアドレス
- 電話番号
- 国籍
- 宿泊希望日またはチェックイン / チェックアウト日
- 宿泊人数
- 部屋数
- ご要望またはお問い合わせ内容

会社は原則として、決済に必要なカード情報を直接収集または保存せず、決済は別途の決済サービス提供会社（PG会社）を通じて処理されます。

## 2. 個人情報の収集および利用目的

会社は、収集した個人情報を以下の目的の範囲内で利用します。

- 長期滞在のお問い合わせ確認
- 予約可能可否の確認
- 決済リンクの送付
- 予約確定および関連案内
- お問い合わせ対応
- チェックインに関する連絡
- 法令上必要な宿泊者管理および義務の履行

会社は、利用者の事前同意なく、個人情報を上記の目的範囲を超えて利用しません。

## 3. 個人情報の収集方法

会社は、以下の方法で個人情報を収集します。

- Google Formsを通じたお問い合わせおよび予約受付
- メールを通じたお問い合わせおよび予約関連コミュニケーション

## 4. 個人情報の保有および利用期間

会社は、個人情報の収集および利用目的が達成された後、当該情報を遅滞なく破棄します。ただし、以下の場合には一定期間、個人情報を保管することがあります。

- 一般お問い合わせ情報：お問い合わせ対応完了後6か月
- 予約および宿泊関連情報：宿泊終了または予約手続き終了後1年
- 関係法令により保管が必要な場合：当該法令で定められた期間

会社は、保管期間が経過した場合、または処理目的が達成された場合、遅滞なく当該個人情報を破棄します。

## 5. 個人情報の第三者提供

会社は、原則として利用者の個人情報を外部に提供しません。ただし、以下の場合は例外とします。

- 利用者が事前に同意した場合
- 法令により提出義務がある場合
- 空港送迎サービスの提供が必要な場合、サービス進行に必要な範囲内で外部ドライバーまたは業者に以下の情報を提供することがあります。
    - 氏名
    - 到着時間
    - 連絡先
- 決済処理の過程で、決済サービス提供会社（PG会社）に必要な情報が提供される場合

会社は、個人情報を販売したり、任意に第三者へ提供したりしません。

## 6. 個人情報処理の委託

会社は、円滑なサービス提供のため、以下のような外部サービスを利用することがあります。

- Google Forms：お問い合わせおよび予約情報の収集
- Gmail：メールでのお問い合わせ対応および予約案内
- 決済サービス提供会社（PG会社）：決済処理

会社は、委託契約を締結する際、個人情報保護関連法令に基づき、個人情報が安全に処理されるよう必要な事項を管理・監督します。

## 7. 個人情報の国外移転

会社は、Google Forms、Gmailなど海外サーバーを基盤とするサービスを利用することがあり、この過程で個人情報が大韓民国以外の地域のサーバーを通じて保存または処理される場合があります。

会社は、国外移転が発生する場合にも、関連法令に基づき個人情報が安全に管理されるよう合理的な保護措置を講じます。

## 8. 情報主体の権利および行使方法

利用者は、いつでも自身の個人情報について、閲覧、訂正、削除、処理停止などを請求することができます。

個人情報に関する請求は、以下のお問い合わせ先を通じて行うことができ、会社は関連法令に基づき遅滞なく必要な措置を講じます。

ただし、法令により保管が必要な情報については、削除が制限される場合があります。

## 9. 未成年者の個人情報保護

会社は、未成年者の予約または個人情報の提供が必要な場合、保護者の同意を得た後にのみ関連手続きを進めます。

保護者の同意は、メールを通じて確認することができます。

## 10. 個人情報の破棄手続きおよび方法

会社は、個人情報の保有期間の経過、処理目的の達成などにより個人情報が不要となった場合、遅滞なく当該個人情報を破棄します。

破棄手続きおよび方法は以下のとおりです。

- 電子的ファイル形式の情報：復元または再生が不可能な方法で削除
- 紙文書形式の情報：裁断または焼却

## 11. 個人情報の安全性確保措置

会社は、個人情報の安全性確保のため、以下のような措置を講じるよう努めます。

- 個人情報へのアクセス権限の最小化
- 個人情報取扱者の管理
- 個人情報が含まれるアカウントおよびシステムのパスワード管理
- 外部サービス利用時のセキュリティ機能点検

ただし、会社は小規模事業者として、運営規模に応じた範囲内で個人情報保護のための合理的な措置を継続的に実施します。

## 12. 個人情報保護に関するお問い合わせ

個人情報保護に関するお問い合わせ、閲覧請求、訂正・削除の請求などは、以下のメールアドレスまでご連絡ください。

- メールアドレス：arustay26@gmail.com

会社は、利用者のお問い合わせに誠実に対応し、必要な措置を講じます。

## 13. プライバシーポリシーの変更

本プライバシーポリシーは、施行日から適用されます。

会社がプライバシーポリシーを変更する場合、変更事項はホームページを通じて告知します。

**施行日：2026年4月27日**

本プライバシーポリシーの原文は韓国語で作成されています。

各言語版の内容に相違または不一致がある場合は、韓国語版が優先されます。`;

const PRIVACY_ZH = `# 隐私政策

ARU STAY（以下简称"公司"）重视信息主体的个人信息，并为遵守《个人信息保护法》等相关法律法规，制定并公开本隐私政策。

公司通过本隐私政策，向用户说明其提供的个人信息将以何种目的和方式被使用，以及公司为保护个人信息采取的相关措施。

## 1. 收集的个人信息项目

公司为处理长住咨询、确认预订、提供付款指引、客户服务等，可能会收集以下个人信息。

- 姓名
- 电子邮箱地址
- 电话号码
- 国籍
- 希望入住日期或入住 / 退房日期
- 入住人数
- 房间数量
- 请求事项或咨询内容

公司原则上不直接收集或保存付款所需的完整银行卡信息，付款将通过另行的支付服务提供商（PG公司）进行处理。

## 2. 个人信息的收集及使用目的

公司将在以下目的范围内使用所收集的个人信息。

- 确认长住咨询
- 确认是否可以预订
- 发送付款链接
- 确认预订及提供相关指引
- 回复客户咨询
- 就入住相关事项进行联系
- 履行法律规定的住宿者管理及相关义务

未经用户事先同意，公司不会将个人信息用于超出上述目的范围的用途。

## 3. 个人信息的收集方式

公司通过以下方式收集个人信息。

- 通过 Google Forms 接收咨询及预订申请
- 通过电子邮件进行咨询及预订相关沟通

## 4. 个人信息的保存及使用期限

公司在个人信息的收集及使用目的达成后，将及时销毁相关信息。但在以下情况下，公司可能会在一定期间内保存个人信息。

- 一般咨询信息：咨询处理完成后6个月
- 预订及住宿相关信息：住宿结束或预订流程结束后1年
- 根据相关法律法规需要保存的情况：按照相关法律法规规定的期间保存

保存期限届满或处理目的达成后，公司将及时销毁相关个人信息。

## 5. 向第三方提供个人信息

原则上，公司不会向外部提供用户的个人信息。但以下情况除外。

- 用户事先同意的情况
- 根据法律法规负有提交义务的情况
- 如需提供机场接送服务，为进行该服务，可能会在必要范围内向外部司机或服务商提供以下信息。
    - 姓名
    - 到达时间
    - 联系方式
- 在付款处理过程中，向支付服务提供商（PG公司）提供必要信息的情况

公司不会出售个人信息，也不会任意向第三方提供个人信息。

## 6. 个人信息处理的委托

为顺利提供服务，公司可能会使用以下外部服务。

- Google Forms：收集咨询及预订信息
- Gmail：处理电子邮件咨询及提供预订指引
- 支付服务提供商（PG公司）：处理付款

公司在签订委托合同时，将根据个人信息保护相关法律法规，对个人信息的安全处理所需事项进行管理和监督。

## 7. 个人信息的境外转移

公司可能会使用 Google Forms、Gmail 等基于海外服务器的服务，在此过程中，个人信息可能会通过韩国以外地区的服务器进行保存或处理。

即使发生境外转移，公司也会根据相关法律法规，采取合理的保护措施，确保个人信息得到安全管理。

## 8. 信息主体的权利及行使方式

用户可随时要求查阅、更正、删除或停止处理自己的个人信息。

个人信息相关请求可通过以下联系方式提出，公司将根据相关法律法规及时采取必要措施。

但根据法律法规需要保存的信息，可能会受到删除限制。

## 9. 未成年人的个人信息保护

如未成年人需要进行预订或提供个人信息，公司仅会在取得监护人同意后进行相关程序。

监护人同意可通过电子邮件进行确认。

## 10. 个人信息的销毁程序及方式

当个人信息保存期限届满、处理目的达成等导致个人信息不再必要时，公司将及时销毁相关个人信息。

销毁程序及方式如下。

- 电子文件形式的信息：以无法恢复或再现的方式删除
- 纸质文件形式的信息：粉碎或焚毁

## 11. 个人信息安全性保障措施

公司为保障个人信息安全，努力采取以下措施。

- 最小化个人信息访问权限
- 管理个人信息处理人员
- 管理含有个人信息的账户及系统密码
- 使用外部服务时检查安全功能

但作为小规模经营场所，公司将在符合其运营规模的范围内，持续采取合理措施保护个人信息。

## 12. 个人信息保护咨询

如有个人信息保护相关咨询，或需要提出查阅、更正、删除请求等，请通过以下电子邮箱联系我们。

- 电子邮箱：arustay26@gmail.com

公司将诚实回复用户的咨询，并采取必要措施。

## 13. 隐私政策的变更

本隐私政策自施行日起适用。

如公司变更本隐私政策，将通过网站公告变更事项。

**施行日：2026年4月27日**

本隐私政策的原始版本以韩文编写。

如各语言版本之间存在任何差异或不一致之处，以韩文版本为准。`;

const TERMS_KO = `# 이용약관

아루스테이(이하 "회사")는 회사가 운영하는 웹사이트 및 관련 예약 서비스를 이용하는 고객과 회사 간의 권리, 의무 및 책임사항을 정함을 목적으로 합니다.

## 제1조 (목적)

본 약관은 회사가 제공하는 숙박 예약 문의, 예약 확인, 결제 안내 및 숙박 서비스 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정합니다.

## 제2조 (용어의 정의)

- "이용자"란 회사의 웹사이트, 문의폼, 이메일 등 회사가 제공하는 수단을 통해 숙박을 문의하거나 예약을 진행하는 자를 말합니다.
- "예약 요청"이란 이용자가 Google Forms, 이메일 또는 기타 회사가 정한 방법으로 숙박 희망 일정 및 관련 정보를 제출하는 행위를 말합니다.
- "예약 확정"이란 회사가 숙박 가능 여부를 확인한 후 발송한 결제 링크 등을 통해 이용자가 결제를 완료하고, 회사가 이를 확인한 상태를 말합니다.
- "장기숙박"이란 회사가 별도로 정한 기준에 따라 10박 이상 숙박하는 경우를 말합니다.

## 제3조 (약관의 게시 및 변경)

- 회사는 본 약관의 내용을 웹사이트에 게시하거나 이용자가 확인할 수 있는 방법으로 제공합니다.
- 회사는 관련 법령 및 운영상 필요에 따라 본 약관을 변경할 수 있습니다.
- 약관이 변경되는 경우 회사는 변경 내용을 웹사이트에 공지합니다.

## 제4조 (예약 요청 및 예약 확정)

- 이용자가 제출하는 숙박 문의 또는 신청은 **예약 요청**에 해당하며, 해당 단계만으로 예약이 확정되는 것은 아닙니다.
- 회사는 이용자가 요청한 숙박 일정의 가능 여부를 확인한 후, 예약이 가능한 경우 결제 링크 또는 별도의 결제 안내를 제공합니다.
- 예약은 이용자가 회사가 보낸 결제 링크 또는 회사가 지정한 방법으로 결제를 완료하고, 회사가 이를 확인한 시점에 확정됩니다.
- 회사의 확인 없이 이용자가 임의로 결제한 경우, 예약이 자동으로 확정되는 것은 아닙니다.
- 회사는 오버부킹 방지, 객실 운영 상황, 숙소 안전 및 운영 정책에 따라 예약 요청을 수락하지 않을 수 있습니다.

## 제5조 (결제)

- 회사는 아래와 같은 결제수단을 제공하거나 제공할 수 있습니다: 해외카드, 국내카드, 계좌이체, 기타 회사가 별도로 안내하는 수단.
- 결제는 회사가 안내하는 통화 및 방식에 따라 진행됩니다.
- 회사는 결제 처리 과정에서 외부 결제 서비스 제공업체(PG사)를 이용할 수 있습니다.
- 이용자는 회사가 안내한 기한 내에 결제를 완료하여야 하며, 기한 내 결제가 완료되지 않은 경우 회사는 해당 예약 요청을 자동 취소하거나 별도 확정 없이 종료할 수 있습니다.

## 제6조 (취소 및 환불)

- 예약 취소 및 환불은 회사가 정한 기준에 따릅니다.
- 이용자가 체크인 예정일 **7일 전까지** 예약을 취소하는 경우, 결제금액 전액을 환불합니다.
- 이용자가 체크인 예정일 **6일 전부터 당일 사이**에 예약을 취소하는 경우, 환불은 제공되지 않습니다.
- 이용자가 사전 연락 없이 숙소를 이용하지 않는 경우(노쇼), 환불은 제공되지 않습니다.
- 환불은 원칙적으로 원결제수단을 통해 처리되며, 실제 환불 반영 시점은 결제 서비스 제공업체(PG사) 또는 카드사 사정에 따라 달라질 수 있습니다.
- 회사와 이용자 사이에 별도로 서면 또는 이메일로 합의한 특별 조건이 있는 경우, 해당 조건이 우선 적용될 수 있습니다.

## 제7조 (체크인 및 체크아웃)

- 체크인 시간은 **오후 3시부터**입니다.
- 체크아웃 시간은 **오전 11시까지**입니다.
- 프론트 운영시간 이후에는 비대면 또는 셀프 체크인 방식이 제공될 수 있습니다.
- 셀프 체크인은 월요일부터 토요일까지는 **오후 9시 이후**, 일요일은 **오후 6시 이후** 가능하며, 다음날 **오전 3시까지** 체크인이 가능합니다.
- 회사는 운영 상황에 따라 체크인 절차 및 안내 방식을 조정할 수 있습니다.

## 제8조 (프론트 운영시간)

- 월요일~토요일: 오전 9시 ~ 오후 9시
- 일요일: 오전 9시 ~ 오후 6시
- 프론트 마감 후에는 회사가 정한 범위 내에서 셀프 체크인 또는 비대면 안내가 제공될 수 있습니다.

## 제9조 (짐 보관 서비스)

- 회사는 체크인 전 및 체크아웃 후 짐 보관 서비스를 제공할 수 있습니다.
- 체크아웃 후 짐 보관은 월요일~토요일 오후 8시까지, 일요일 오후 5시까지 가능합니다.
- 귀중품, 현금, 전자기기, 여권 등 고가품 또는 분실 위험이 있는 물품에 대해서는 이용자가 직접 보관하여야 하며, 회사는 이에 대한 분실·도난·훼손 책임을 지지 않습니다.
- 회사는 보관 공간의 한계, 안전상 이유 또는 운영 사정에 따라 짐 보관 서비스를 제한할 수 있습니다.

## 제10조 (장기숙박 혜택)

- 10박 이상 예약한 이용자에게는 1박 무료 추가 제공 또는 공항 택시 픽업 무료 제공 중 하나의 혜택을 제공할 수 있습니다.
- 위 혜택은 **둘 중 하나만 선택 가능**하며, 중복 적용되지 않습니다.
- 회사는 운영 상황에 따라 장기숙박 혜택의 적용 방식, 제공 가능 여부 또는 세부 조건을 조정할 수 있으며, 예약 확정 전 개별 안내를 통해 최종 내용을 고지합니다.

## 제11조 (미성년자의 예약)

- 미성년자가 숙박을 예약하거나 이용하려는 경우, 회사는 보호자의 동의를 요구할 수 있습니다.
- 보호자 동의는 이메일 등 회사가 인정하는 방법으로 확인할 수 있습니다.
- 보호자 동의가 확인되지 않은 경우, 회사는 예약 요청을 거절하거나 예약 확정을 보류 또는 취소할 수 있습니다.

## 제12조 (이용자의 의무)

이용자는 숙소 이용 중 다음 각 호의 행위를 하여서는 안 됩니다.

- 숙소 내 금연 규정 위반
- 다른 고객에게 피해를 주는 소음, 위협, 위험행위 또는 불쾌감을 주는 행위
- 시설, 비품 또는 객실을 훼손하는 행위
- 불법행위 또는 공공질서·미풍양속에 반하는 행위
- 방문객을 사전 고지 없이 객실 또는 숙소 내로 출입시키는 행위

이용자가 위 행위를 한 경우, 회사는 경고, 이용 제한, 퇴실 조치 또는 손해배상을 청구할 수 있습니다.

## 제13조 (방문객 규정)

- 가족, 친구 등 외부 방문객이 숙소를 방문하는 경우, 이용자는 사전에 프론트에 이를 알려야 합니다.
- 회사는 숙소의 안전, 다른 고객의 편안한 이용, 운영상 필요에 따라 방문객의 출입을 제한할 수 있습니다.

## 제14조 (회사의 예약 거절 또는 해지)

회사는 아래 사유가 있는 경우 예약 요청을 거절하거나 이미 확정된 예약을 해지할 수 있습니다.

- 이용자가 허위 정보를 제공한 경우
- 결제가 완료되지 않은 경우
- 미성년자 예약에 대해 보호자 동의가 확인되지 않은 경우
- 숙소 규정 위반 우려가 크다고 합리적으로 판단되는 경우
- 불법행위 또는 안전상 문제가 발생하거나 발생할 우려가 있는 경우
- 천재지변, 시설 고장, 불가항력적 사정 등으로 정상적인 숙박 제공이 어려운 경우

## 제15조 (손해배상)

- 이용자가 고의 또는 과실로 회사의 시설, 비품 또는 운영에 손해를 입힌 경우, 회사는 그에 대한 배상을 청구할 수 있습니다.
- 회사는 이용자의 귀책사유로 발생한 손해에 대해서 책임을 지지 않습니다.

## 제16조 (면책)

- 회사는 천재지변, 정전, 교통장애, 외부 시스템 장애, 결제사 또는 제3자 서비스 장애 등 회사의 합리적 통제를 벗어난 사유로 발생한 손해에 대하여 책임을 지지 않습니다.
- 회사는 이용자가 입력한 정보의 오류, 연락 불가, 이메일 미확인 등 이용자의 귀책사유로 인해 발생한 불이익에 대해 책임을 지지 않습니다.
- 회사는 이용자의 개인 소지품 분실, 도난, 훼손에 대하여 회사의 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.

## 제17조 (준거법 및 분쟁해결)

- 본 약관은 대한민국 법령에 따라 해석되고 적용됩니다.
- 회사와 이용자 사이에 분쟁이 발생한 경우, 당사자는 우선 성실히 협의하여 해결하도록 노력합니다.
- 협의로 해결되지 않는 경우, 관련 법령에 따라 대한민국 법원에 분쟁 해결을 요청할 수 있습니다.

## 제18조 (문의처)

본 약관 및 예약 관련 문의는 아래 이메일로 연락해 주시기 바랍니다.

- 이메일: **arustay26@gmail.com**

## 부칙

본 약관은 **2026년 4월 27일**부터 시행합니다.`;

const TERMS_EN = `# Terms of Service

These Terms of Service set forth the rights, obligations, and responsibilities between ARU STAY ("the Company," "we," "us," or "our") and users of the website and related reservation services operated by the Company.

## Article 1. Purpose

These Terms of Service govern the rights, obligations, and responsibilities between the Company and users in connection with accommodation inquiries, reservation confirmation, payment guidance, and use of accommodation services provided by the Company.

## Article 2. Definitions

- "User" means any person who makes an accommodation inquiry or proceeds with a reservation through the Company's website, inquiry form, email, or any other method designated by the Company.
- "Reservation Request" means the act of submitting preferred stay dates and related information through Google Forms, email, or any other method designated by the Company.
- "Confirmed Reservation" means a reservation that has been completed after the Company confirms availability, sends a payment link or payment instructions, and the user completes payment which is then confirmed by the Company.
- "Long Stay" means a stay of 10 nights or more, as determined by the Company.

## Article 3. Posting and Amendment of the Terms

- The Company shall make these Terms available on its website or through other accessible means.
- The Company may amend these Terms as necessary in accordance with applicable laws and operational requirements.
- If the Terms are amended, the Company will post the revised Terms on its website.

## Article 4. Reservation Request and Reservation Confirmation

- Any accommodation inquiry or application submitted by a user constitutes only a **Reservation Request** and does not by itself confirm the reservation.
- After reviewing availability for the requested dates, the Company may provide the user with a payment link or separate payment instructions if the stay can be accommodated.
- A reservation is confirmed only when the user completes payment using the payment link or other method designated by the Company, and the Company confirms such payment.
- A reservation shall not be automatically confirmed solely because a user makes a payment without the Company's confirmation.
- The Company may decline a Reservation Request in consideration of overbooking prevention, room operation status, accommodation safety, or other operational policies.

## Article 5. Payment

- The Company may offer or support the following payment methods: international cards, domestic cards, bank transfer, and other methods separately notified by the Company.
- Payment shall be made in the currency and manner specified by the Company.
- The Company may use an external payment service provider (PG) to process payments.
- Users must complete payment within the period specified by the Company. If payment is not completed within such period, the Company may automatically cancel the Reservation Request or close the reservation process without confirmation.

## Article 6. Cancellation and Refund

- Reservation cancellation and refund shall be handled in accordance with the standards set by the Company.
- If a user cancels the reservation **7 days or more before the scheduled check-in date**, the full payment amount will be refunded.
- If a user cancels the reservation **from 6 days before the scheduled check-in date up to the check-in date itself**, no refund will be provided.
- If a user fails to check in without prior notice (no-show), no refund will be provided.
- Refunds shall, in principle, be made to the original payment method. The actual timing of the refund may vary depending on the payment service provider (PG) or card issuer.
- If the Company and the user have separately agreed to special conditions in writing or by email, such special conditions may prevail.

## Article 7. Check-in and Check-out

- Check-in begins at **3:00 PM**.
- Check-out must be completed by **11:00 AM**.
- After front desk hours, the Company may provide contactless or self check-in procedures.
- Self check-in is available from **9:00 PM** on Mondays through Saturdays, from **6:00 PM** on Sundays, and until **3:00 AM the following day**.
- The Company may adjust check-in procedures and guidance depending on operational circumstances.

## Article 8. Front Desk Hours

- Monday to Saturday: **9:00 AM to 9:00 PM**
- Sunday: **9:00 AM to 6:00 PM**
- After the front desk closes, self check-in or contactless guidance may be provided within the scope determined by the Company.

## Article 9. Luggage Storage

- The Company may provide luggage storage before check-in and after check-out.
- After check-out, luggage storage is available until **8:00 PM** from Monday to Saturday, and **5:00 PM** on Sunday.
- Users must keep valuables, cash, electronic devices, passports, and other high-value or easily lost items with them. The Company shall not be liable for loss, theft, or damage of such items.
- The Company may restrict luggage storage due to space limitations, safety reasons, or operational circumstances.

## Article 10. Long-Stay Benefits

- Users who book a stay of 10 nights or more may receive one of the following benefits: one additional night free of charge, or free airport taxi pickup.
- Only **one** of the above benefits may be selected, and both benefits cannot be combined.
- The Company may adjust the method of application, availability, or detailed conditions of long-stay benefits depending on operational circumstances, and the final details will be separately communicated before reservation confirmation.

## Article 11. Reservations by Minors

- If a minor wishes to make or use a reservation, the Company may require consent from a parent or legal guardian.
- Parental or guardian consent may be verified by email or by another method recognized by the Company.
- If such consent is not confirmed, the Company may decline the Reservation Request or suspend or cancel the reservation confirmation process.

## Article 12. Obligations of Users

Users shall not engage in any of the following while using the accommodation:

- Violating the no-smoking policy within the accommodation
- Causing noise, threats, dangerous behavior, or discomfort to other guests
- Damaging facilities, furniture, fixtures, or guest rooms
- Engaging in illegal conduct or conduct contrary to public order and morals
- Allowing visitors to enter the room or accommodation without prior notice

If a user engages in any of the above, the Company may issue a warning, restrict use, require the user to leave, or claim damages.

## Article 13. Visitor Policy

- If family members, friends, or other outside visitors wish to visit the accommodation, the user must notify the front desk in advance.
- The Company may restrict visitor access as necessary for safety, the comfort of other guests, or operational reasons.

## Article 14. Refusal or Termination of Reservation by the Company

The Company may refuse a Reservation Request or terminate an already confirmed reservation in the following cases:

- The user provides false or misleading information
- Payment is not completed
- Parental or guardian consent for a minor is not confirmed
- The Company reasonably determines that there is a significant risk of violation of accommodation rules
- Illegal conduct or safety issues arise or are likely to arise
- It becomes difficult to provide accommodation normally due to force majeure, facility failure, or other unavoidable circumstances

## Article 15. Damages

- If a user causes damage to the Company's facilities, furniture, fixtures, or operations through intent or negligence, the Company may claim compensation for such damage.
- The Company shall not be liable for damage caused by reasons attributable to the user.

## Article 16. Disclaimer

- The Company shall not be liable for damages arising from circumstances beyond its reasonable control, including natural disasters, power outages, transportation disruptions, external system failures, or failures of payment service providers or third-party services.
- The Company shall not be liable for disadvantages caused by the user's own fault, including incorrect information, inability to contact the user, or failure to check email.
- The Company shall not be liable for loss, theft, or damage to a user's personal belongings unless caused by the Company's intentional misconduct or gross negligence.

## Article 17. Governing Law and Dispute Resolution

- These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea.
- In the event of a dispute between the Company and a user, both parties shall first attempt to resolve the matter through sincere consultation.
- If the dispute cannot be resolved through consultation, either party may seek resolution before a competent court in accordance with applicable law.

## Article 18. Contact

For questions regarding these Terms or reservations, please contact us at:

- Email: **arustay26@gmail.com**

## Supplementary Provision

These Terms shall take effect on **April 27, 2026**.

The original version of these Terms of Service is written in Korean. In the event of any discrepancy or inconsistency between language versions, the Korean version shall prevail.`;

const TERMS_JA = `# 利用規約

本利用規約は、ARU STAY（以下「当社」といいます）が運営するウェブサイトおよび関連予約サービスを利用するお客様と当社との間の権利、義務および責任事項を定めるものです。

## 第1条（目的）

本規約は、当社が提供する宿泊に関するお問い合わせ、予約確認、決済案内および宿泊サービスの利用に関して、当社と利用者との間の権利、義務および責任事項を定めることを目的とします。

## 第2条（定義）

- 「利用者」とは、当社のウェブサイト、お問い合わせフォーム、メールその他当社が指定する方法を通じて宿泊に関する問い合わせまたは予約手続きを行う者をいいます。
- 「予約リクエスト」とは、利用者が Google Forms、メールまたは当社が定めるその他の方法により、宿泊希望日程および関連情報を提出する行為をいいます。
- 「予約確定」とは、当社が宿泊可能可否を確認した後、決済リンクまたは決済案内を送付し、利用者が決済を完了し、当社がこれを確認した状態をいいます。
- 「長期滞在」とは、当社が別途定める基準に従い、10泊以上宿泊する場合をいいます。

## 第3条（規約の掲示および変更）

- 当社は、本規約の内容をウェブサイトまたは利用者が確認できる方法により提供します。
- 当社は、関連法令および運営上の必要に応じて本規約を変更することができます。
- 規約が変更される場合、当社は変更内容をウェブサイトに掲示します。

## 第4条（予約リクエストおよび予約確定）

- 利用者が提出する宿泊のお問い合わせまたは申込みは、**予約リクエスト**に該当し、その段階では予約は確定しません。
- 当社は、利用者が希望する宿泊日程の空室状況を確認した後、宿泊可能な場合に限り、決済リンクまたは別途決済方法をご案内します。
- 予約は、利用者が当社が送付した決済リンクまたは当社が指定する方法により決済を完了し、当社がこれを確認した時点で確定します。
- 当社の確認なく利用者が任意に決済を行った場合でも、自動的に予約が確定するものではありません。
- 当社は、オーバーブッキング防止、客室運営状況、宿泊施設の安全、その他運営方針により、予約リクエストをお受けできない場合があります。

## 第5条（決済）

- 当社は、海外発行カード、国内発行カード、銀行振込、その他当社が別途案内する方法を提供し、または提供することがあります。
- 決済は、当社が案内する通貨および方法に従って行われます。
- 当社は、決済処理のために外部決済サービス提供会社（PG）を利用することがあります。
- 利用者は、当社が案内した期限内に決済を完了しなければなりません。期限内に決済が完了しない場合、当社は当該予約リクエストを自動的に取り消し、または予約確定なく手続きを終了することがあります。

## 第6条（キャンセルおよび返金）

- 予約のキャンセルおよび返金は、当社が定める基準に従って処理されます。
- 利用者がチェックイン予定日の**7日前まで**に予約をキャンセルした場合、決済金額の全額を返金します。
- 利用者がチェックイン予定日の**6日前から当日まで**の間に予約をキャンセルした場合、返金は行われません。
- 利用者が事前連絡なく宿泊しなかった場合（ノーショー）、返金は行われません。
- 返金は原則として元の決済手段を通じて行われます。実際の返金反映時期は、決済サービス提供会社（PG）またはカード会社の事情により異なる場合があります。
- 当社と利用者の間で、書面またはメールにより特別条件が別途合意されている場合は、その条件が優先されることがあります。

## 第7条（チェックインおよびチェックアウト）

- チェックインは**午後3時から**可能です。
- チェックアウトは**午前11時まで**に完了していただく必要があります。
- フロント営業時間終了後は、非対面またはセルフチェックイン方式が提供される場合があります。
- セルフチェックインは、月曜日から土曜日までは**午後9時以降**、日曜日は**午後6時以降**、翌日**午前3時まで**利用可能です。
- 当社は、運営状況に応じてチェックイン手続きおよび案内方法を調整することがあります。

## 第8条（フロント営業時間）

- 月曜日～土曜日：午前9時～午後9時
- 日曜日：午前9時～午後6時
- フロント営業時間終了後は、当社が定める範囲内でセルフチェックインまたは非対面案内が提供される場合があります。

## 第9条（荷物預かりサービス）

- 当社は、チェックイン前およびチェックアウト後の荷物預かりサービスを提供することがあります。
- チェックアウト後の荷物預かりは、月曜日～土曜日は午後8時まで、日曜日は午後5時まで可能です。
- 貴重品、現金、電子機器、パスポートなど高価な物品または紛失の恐れがある物品については、利用者ご自身で保管していただくものとし、当社はそれらの紛失、盗難または破損について責任を負いません。
- 当社は、保管スペースの制限、安全上の理由または運営上の事情により、荷物預かりサービスを制限することがあります。

## 第10条（長期滞在特典）

- 10泊以上ご予約された利用者には、1泊無料追加、または空港タクシーピックアップ無料提供のいずれかの特典を提供することがあります。
- 上記特典は**いずれか一つのみ選択可能**であり、重複して適用することはできません。
- 当社は、運営状況に応じて長期滞在特典の適用方法、提供可否または詳細条件を調整することがあり、最終内容は予約確定前に個別にご案内します。

## 第11条（未成年者の予約）

- 未成年者が宿泊予約または宿泊利用を希望する場合、当社は保護者の同意を求めることがあります。
- 保護者の同意は、メールその他当社が認める方法により確認することができます。
- 保護者の同意が確認できない場合、当社は予約リクエストを拒否し、または予約確定を保留もしくは取消しすることがあります。

## 第12条（利用者の義務）

利用者は、宿泊施設の利用中、以下の各号に該当する行為をしてはなりません。

- 宿泊施設内での禁煙規定違反
- 他のお客様に迷惑を及ぼす騒音、威嚇行為、危険行為または不快感を与える行為
- 施設、備品または客室を破損する行為
- 違法行為または公序良俗に反する行為
- 事前通知なく訪問者を客室または宿泊施設内に立ち入らせる行為

利用者が上記行為を行った場合、当社は警告、利用制限、退去措置または損害賠償の請求を行うことがあります。

## 第13条（訪問者に関する規定）

- 家族、友人その他の外部訪問者が宿泊施設を訪れる場合、利用者は事前にフロントへ通知しなければなりません。
- 当社は、安全、他のお客様の快適な利用、または運営上の必要に応じて、訪問者の立ち入りを制限することがあります。

## 第14条（当社による予約拒否または解除）

当社は、以下の事由がある場合、予約リクエストを拒否し、または既に確定した予約を解除することができます。

- 利用者が虚偽または誤解を招く情報を提供した場合
- 決済が完了しない場合
- 未成年者の予約について保護者の同意が確認できない場合
- 宿泊規則違反のおそれが大きいと当社が合理的に判断した場合
- 違法行為または安全上の問題が発生し、または発生するおそれがある場合
- 天災、施設故障、不可抗力その他やむを得ない事情により、通常どおり宿泊サービスを提供することが困難となった場合

## 第15条（損害賠償）

- 利用者が故意または過失により当社の施設、備品または運営に損害を与えた場合、当社はその損害について賠償を請求することができます。
- 当社は、利用者の責めに帰すべき事由により発生した損害について責任を負いません。

## 第16条（免責）

- 当社は、天災、停電、交通障害、外部システム障害、決済会社または第三者サービスの障害など、当社の合理的な支配を超える事由により発生した損害について責任を負いません。
- 当社は、入力情報の誤り、連絡不能、メール未確認など、利用者の責めに帰すべき事由により生じた不利益について責任を負いません。
- 当社は、当社の故意または重大な過失がない限り、利用者の私物の紛失、盗難または破損について責任を負いません。

## 第17条（準拠法および紛争解決）

- 本規約は、大韓民国の法令に準拠し、これに従って解釈されます。
- 当社と利用者との間で紛争が生じた場合、双方はまず誠実に協議し、その解決に努めるものとします。
- 協議によって解決できない場合、当事者は関係法令に従い、大韓民国の管轄裁判所に紛争解決を求めることができます。

## 第18条（お問い合わせ先）

本規約および予約に関するお問い合わせは、以下のメールアドレスまでご連絡ください。

- メールアドレス: **arustay26@gmail.com**

## 附則

本規約は**2026年4月27日**より施行します。

本利用規約の原文は韓国語で作成されています。各言語版の内容に相違または不一致がある場合は、韓国語版が優先されます。`;

const TERMS_ZH = `# 使用条款

本使用条款规定了 ARU STAY（以下简称"本公司"）与使用本公司运营的网站及相关预订服务的用户之间的权利、义务和责任。

## 第1条（目的）

本条款旨在规定本公司与用户之间，就本公司提供的住宿咨询、预订确认、付款说明及住宿服务使用相关的权利、义务和责任。

## 第2条（定义）

- "用户"是指通过本公司网站、咨询表单、电子邮件或本公司指定的其他方式提出住宿咨询或进行预订的人。
- "预订申请"是指用户通过 Google Forms、电子邮件或本公司指定的其他方式提交希望入住日期及相关信息的行为。
- "预订确认"是指本公司确认可入住情况后，向用户发送付款链接或付款说明，且用户完成付款并经本公司确认的状态。
- "长住"是指按照本公司另行规定的标准，连续入住 10 晚及以上的情况。

## 第3条（条款的公示及变更）

- 本公司将在网站上发布本条款，或通过其他用户可以查阅的方式提供本条款内容。
- 本公司可根据相关法律法规及运营需要对本条款进行修改。
- 如本条款发生变更，本公司将通过网站公告更新内容。

## 第4条（预订申请及预订确认）

- 用户提交的住宿咨询或申请仅属于**预订申请**，并不因此自动构成预订确认。
- 本公司在确认用户所申请日期是否有空房后，如可安排住宿，将向用户发送付款链接或另行提供付款说明。
- 只有在用户通过本公司发送的付款链接或本公司指定的方式完成付款，且本公司确认收到付款后，预订方视为确认成立。
- 未经本公司确认，用户自行付款的，不视为预订自动成立。
- 出于防止超额预订、房间运营状况、住宿安全及其他运营政策考虑，本公司可拒绝预订申请。

## 第5条（付款）

- 本公司可提供或支持以下付款方式：国际信用卡、韩国国内信用卡、银行转账，以及本公司另行通知的其他方式。
- 付款应按照本公司说明的币种及方式进行。
- 本公司可使用外部支付服务提供商（PG）处理付款。
- 用户应在本公司规定的期限内完成付款。若未在期限内完成付款，本公司可自动取消该预订申请，或在不作确认的情况下终止预订流程。

## 第6条（取消及退款）

- 预订取消及退款按照本公司规定的标准处理。
- 如用户在预计入住日期**7天前或更早**取消预订，本公司将全额退款。
- 如用户在预计入住日期**前6天至入住当日**之间取消预订，本公司不予退款。
- 如用户未事先通知且未入住（no-show），本公司不予退款。
- 退款原则上将退回至原付款方式。实际到账时间可能因支付服务提供商（PG）或发卡机构的处理流程而有所不同。
- 如本公司与用户之间另有书面或电子邮件约定的特别条件，则该特别条件可优先适用。

## 第7条（入住及退房）

- 入住时间自**下午3:00**开始。
- 退房时间截止至**上午11:00**。
- 前台营业时间结束后，本公司可提供非面对面或自助入住方式。
- 自助入住可使用时间：周一至周六**晚上9:00以后**，周日**晚上6:00以后**，最晚可至**次日凌晨3:00**办理入住。
- 本公司可根据运营情况调整入住流程及说明方式。

## 第8条（前台营业时间）

- 周一至周六：上午9:00 至 晚上9:00
- 周日：上午9:00 至 晚上6:00
- 前台结束营业后，本公司可在其规定范围内提供自助入住或非面对面说明。

## 第9条（行李寄存服务）

- 本公司可提供入住前及退房后的行李寄存服务。
- 退房后的行李寄存时间：周一至周六**晚上8:00**截止，周日**下午5:00**截止。
- 贵重物品、现金、电子设备、护照等高价值物品或易遗失物品应由用户自行保管，本公司对其遗失、被盗或损坏不承担责任。
- 因寄存空间限制、安全原因或运营需要，本公司可限制行李寄存服务。

## 第10条（长住优惠）

- 预订 10 晚及以上的用户可在以下优惠中选择其一：免费加住 1 晚，或免费机场出租车接送。
- 上述优惠**仅可二选一**，不可同时适用。
- 本公司可根据运营情况调整长住优惠的适用方式、提供与否或具体条件，并将在预订确认前另行通知最终内容。

## 第11条（未成年人预订）

- 若未成年人希望进行预订或入住，本公司可要求提供监护人同意。
- 监护人同意可通过电子邮件或本公司认可的其他方式进行确认。
- 如未能确认监护人同意，本公司可拒绝预订申请，或保留、取消预订确认流程。

## 第12条（用户义务）

用户在使用住宿服务期间，不得从事以下行为：

- 违反住宿场所禁烟规定
- 制造噪音、威胁、危险行为或对其他客人造成不适
- 损坏设施、家具、设备或客房
- 从事违法行为或违反公共秩序及善良风俗的行为
- 未事先通知即让访客进入客房或住宿场所

如用户从事上述行为，本公司可予以警告、限制使用、要求退房或请求赔偿损失。

## 第13条（访客规定）

- 如家人、朋友或其他访客希望到访住宿场所，用户须事先通知前台。
- 出于安全、其他客人的舒适使用或运营需要，本公司可限制访客进入。

## 第14条（本公司拒绝或解除预订）

如出现以下情形，本公司可拒绝预订申请或解除已确认的预订：

- 用户提供虚假或误导性信息
- 未完成付款
- 未能确认未成年人的监护人同意
- 本公司有合理理由认为用户存在较大违反住宿规定的风险
- 已发生或可能发生违法行为或安全问题
- 因自然灾害、设施故障、不可抗力或其他不可避免的情况，难以正常提供住宿服务

## 第15条（损害赔偿）

- 如用户因故意或过失对本公司的设施、设备或运营造成损失，本公司有权要求其赔偿。
- 对于因用户自身原因造成的损失，本公司不承担责任。

## 第16条（免责声明）

- 因自然灾害、停电、交通中断、外部系统故障、支付服务商或第三方服务故障等超出本公司合理控制范围的原因造成的损失，本公司不承担责任。
- 因用户填写信息错误、无法联系、未查看电子邮件等用户自身原因造成的不利后果，本公司不承担责任。
- 除因本公司故意或重大过失外，本公司对用户个人物品的遗失、被盗或损坏不承担责任。

## 第17条（准据法及争议解决）

- 本条款依据大韩民国法律解释并适用。
- 如本公司与用户之间发生争议，双方应首先通过诚意协商解决。
- 如协商无法解决争议，任何一方均可依据相关法律向大韩民国有管辖权的法院提起诉讼。

## 第18条（联系方式）

如对本条款或预订事项有任何疑问，请通过以下电子邮箱联系我们：

- 电子邮箱：**arustay26@gmail.com**

## 附则

本条款自 **2026年4月27日** 起施行。

本使用条款的原始版本以韩文编写。如各语言版本之间存在任何差异或不一致之处，以韩文版本为准。`;

export const PRIVACY: Record<LegalLocale, LegalDoc> = {
  ko: { title: '개인정보처리방침', markdown: PRIVACY_KO },
  en: { title: 'Privacy Policy', markdown: PRIVACY_EN },
  ja: { title: 'プライバシーポリシー', markdown: PRIVACY_JA },
  zh: { title: '隐私政策', markdown: PRIVACY_ZH },
};

export const TERMS: Record<LegalLocale, LegalDoc> = {
  ko: { title: '이용약관', markdown: TERMS_KO },
  en: { title: 'Terms of Service', markdown: TERMS_EN },
  ja: { title: '利用規約', markdown: TERMS_JA },
  zh: { title: '服务条款', markdown: TERMS_ZH },
};
