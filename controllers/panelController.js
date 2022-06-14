class PanelController {
  get(req, res, next) {
    return res.render('../views/panel');
  }
}

module.exports = new PanelController();
