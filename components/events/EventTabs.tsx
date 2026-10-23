const markup = "<div class=\"event-tabs-wrap\">\n  <div class=\"event-tabs\" role=\"tablist\" aria-label=\"Wedding events\">\n\n    <button\n      type=\"button\"\n      class=\"event-tab\"\n      role=\"tab\"\n      data-event-tab=\"event-nikkah\"\n      aria-selected=\"false\"\n    >\n      Nikkah\n      <small>Family</small>\n    </button>\n\n    <button\n      type=\"button\"\n      class=\"event-tab\"\n      role=\"tab\"\n      data-event-tab=\"event-mehndi\"\n      aria-selected=\"false\"\n    >\n      Mehndi\n      <small>Family</small>\n    </button>\n\n    <button\n      type=\"button\"\n      class=\"event-tab\"\n      role=\"tab\"\n      data-event-tab=\"event-baraat\"\n      aria-selected=\"false\"\n    >\n      Baraat\n      <small>Family</small>\n    </button>\n\n    <button\n      type=\"button\"\n      class=\"event-tab active\"\n      role=\"tab\"\n      data-event-tab=\"event-walima\"\n      aria-selected=\"true\"\n    >\n      Walima\n      <small>Invitation</small>\n    </button>\n\n  </div>\n</div>";

export default function EventTabs() {
  return (
    <div
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
