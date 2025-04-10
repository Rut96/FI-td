import { useForm } from 'react-hook-form';
import { TextField,Button } from '@mui/material'
import './TDForm.css'

export function TDForm( { addTask } ) {

    const { register, handleSubmit, reset } = useForm()

    function send(data) {
        addTask(data.title, data.text);
        reset();
    }

    return (
        <div className="TDForm">
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    id="input-title"
                    label="Title"
                    variant="outlined"
                    placeholder='Please add title'
                    {...register('title')}
                />

                <TextField
                    id="input-task"
                    label="Task"
                    variant="outlined"
                    placeholder='Please add task'
                    {...register('text')}
                />
                <Button variant="contained" type='submit'>Add</Button>
            </form>
        </div>
    );
}