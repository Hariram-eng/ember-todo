import Model,{ attr ,hasMany } from '@ember-data/model';

export default class TodoModel extends Model {
    @hasMany('secondarytask') children_tasks;
    
    @attr('string') task_title;
}
