import Model,{ attr ,belongsTo } from '@ember-data/model';

export default class SecondarytaskModel extends Model {
    @belongsTo('primarytask') primarytask;  

    @attr('string') sub_task;
    @attr('boolean') isChecked;
}
