
function LRUCache(maxSize) {
  this.maxSize = maxSize || 100;
  this.size = 0;
  this.cache = {}; // key => val
  this.useIndex = {}; // use index => key
  this.useReverse = {}; // key => use index
  this.mostRecent = -1;
  this.leastRecent = -1;
}

LRUCache.prototype.get = function(key) {
  key = key + '';
  if (!this.cache[key]) {
    return;
  }
  delete this.useIndex[this.useReverse[key]];

  this._makeMostRecent(key);
  return this.cache[key];
};

LRUCache.prototype.set = function(key, val) {
  key = key + '';
  this.size += 1;
  this.cache[key] = val;
  this._makeMostRecent(key);

  if (this.size > this.maxSize) {
    this._pop();
  }
};

LRUCache.prototype._makeMostRecent = function (key) {
  this.mostRecent += 1;
  var newIndex = this.mostRecent;
  this.useIndex[newIndex] = key;
  this.useReverse[key] = newIndex;
}

LRUCache.prototype._pop = function () {
  while (this.leastRecent < this.mostRecent) {
    var oldKey = this.useIndex[this.leastRecent];
    if (oldKey) {
      delete this.useIndex[this.leastRecent];
      delete this.useReverse[oldKey];
      delete this.cache[oldKey];
      this.leastRecent += 1;
      this.size -= 1;
      return;
    }
    this.leastRecent += 1;
  }
}

module.exports = LRUCache;
