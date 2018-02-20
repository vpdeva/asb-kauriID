function CRUD(model) {
    this.DataModel = model;

    this.create = (record) => {
        let newRecord = new this.DataModel(record);
        return newRecord.save();
    }
    
    this.find = (queryParams={}) => {
        return this.DataModel.find(queryParams)
    }
    
    this.update = (condition={}, updateValue, options={}) => {
        return this.DataModel.update(condition, updateValue, options)
    }
    
    this.remove = (keyParams={}) => {
        return this.DataModel.remove(keyParams)
    }
}

module.exports = CRUD;