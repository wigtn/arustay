export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">대시보드</h1>
      <p className="text-neutral-600 mb-8">
        왼쪽 메뉴에서 편집할 섹션을 선택하세요. 저장하면 공개 사이트에 즉시 반영됩니다.
      </p>
      <div className="p-5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 leading-relaxed">
        <p className="font-medium mb-2">사용 안내</p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-600">
          <li><strong>텍스트 (스칼라)</strong> — 한 필드당 한 문장인 텍스트 (hero 제목, 메뉴 이름 등)</li>
          <li><strong>About / 객실 / 편의시설 / FAQ / 후기 / 접근성 / 장기숙박 불릿</strong> — 여러 항목을 추가/삭제/순서 변경 가능</li>
          <li><strong>이미지</strong> — 히어로 이미지, 객실별 사진 등 업로드/교체</li>
          <li>모든 섹션에서 4개 언어 (ko · en · ja · zh) 를 동시에 편집합니다.</li>
        </ul>
      </div>
    </div>
  );
}
