const _mapWidth = 15;
const _mapHeight = 14;
const _cellWidth = 50;
const _cellHeight = 50;

const settings = {
  mapWidth: _mapWidth,
  mapHeight: _mapHeight,
  cellWidth: _cellWidth,
  cellHeight: _cellHeight,
  fieldWidth: (() => {
    return _mapWidth * _cellWidth;
  })(),
  fieldHeight: (() => {
    return _mapHeight * _cellHeight;
  })()
};

export default settings;
