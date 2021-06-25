
import Controller from '@ember/controller';
import { action , computed } from "@ember/object";
import {inject as service } from '@ember/service';


export default class PrimarytaskController extends Controller {

    @service
    store;

    @computed
    get activeTask(){
        return this.store.findAll('primarytask');
    }

    @action
    submit(event){
        event.preventDefault();
        let value=event.target.children[0].value.trim();
        if(value != ""){
            this.store.createRecord('primarytask',{
                task_title:value,
            }).save();
            event.target.children[0].value="";
        }
        else{
            alert('Please fill the input box');
        }
            
    }


    allClear=(param)=>{
        var decider=prompt('Are you sure do you want to delete all todos  Y/N').toUpperCase();
        decider=(decider == 'Y')?true:false;
        if(decider){
            var temArray=param.path[1].children[3].children;
            for(let i=1;i<temArray.length;i+=2){
                this.deleteRecord(temArray[i].value);         
            }
        }       
    }


    @action
    async deleteRecord(args){        
        let data= await this.store.findRecord('primarytask', args ,{include:'children_tasks'});
        let temArray=data.get('children_tasks').content.currentState;
        let temArray1=[];
        let decider=true;
        for(let i=0;i<temArray.length;i+=1){
            temArray1[i]=await this.store.findRecord('secondarytask',temArray[i].id);
        }
        for(let i=0;i<temArray1.length;i+=1){
            if(!temArray1[i].isChecked){ 
                decider=false; 
                break;
            }
        }
        if(!decider){
            alert('You have some pending task in '+ data.task_title);
        }
        else{
            data.destroyRecord();
        }
    }
}
