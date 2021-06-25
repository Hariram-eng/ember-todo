import Route from '@ember/routing/route';

export default class SecondarytaskRoute extends Route {
    model(params){
        let data=this.store.queryRecord('primarytask',{
            filter:{task_title:params.task},
            include:"children_tasks"
        })
        return data;
    }
}
