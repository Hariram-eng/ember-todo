import Controller from '@ember/controller';
import { action } from "@ember/object";
import {inject as service } from '@ember/service';

export default class SecondarytaskController extends Controller {
    @service
    store;

    @action
    submit(parentTask, event) {
        event.preventDefault();
        let value = event.target.children[0].value.trim();


        if (value != "") {
            let task = this.store.createRecord('secondarytask', {
                sub_task: event.target.children[0].value.trim(),
                isChecked: false,
                parentTask: parentTask,
            })
            parentTask.get('children_tasks').pushObject(task);
            task.save().then(function() {
                parentTask.save();
            });
            event.target.children[0].value = "";
        } else {
            alert('Please fill the input field');
        }


    }

    check = (event) => {
        var decider = event.path[0];
        this.store.findRecord('secondarytask', decider.value).then((data) => {
            if (!decider.checked) {
                data.isChecked = false;
            } else {
                data.isChecked = true;
            }
            this.model.reload();
            data.save();
        });
    }
}