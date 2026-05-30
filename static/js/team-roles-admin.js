/**
 * Optional: staff can export role text from browser console after editing on homepage.
 * Run: AllianceTeamRoles.exportRoles()
 */
(function () {
  window.AllianceTeamRoles = {
    exportRoles() {
      const roles = {};
      document.querySelectorAll('[data-team-role]').forEach((el) => {
        const id = el.dataset.teamRole;
        const text = el.textContent.trim();
        const placeholder = el.dataset.placeholder;
        if (text && text !== placeholder) {
          roles[id] = text;
        }
      });
      console.log('Copy these into static/data/team.json "role" fields:\n', JSON.stringify(roles, null, 2));
      return roles;
    },
  };
})();
