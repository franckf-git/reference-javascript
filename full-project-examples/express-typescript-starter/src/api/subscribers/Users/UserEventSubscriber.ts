import { EventSubscriber, On } from 'event-dispatch'
import { SendWelcomeMail } from '@api/queue-jobs/Users/SendWelcomeMail'

@EventSubscriber()
export class UserEventSubscriber {
    @On('onUserRegister')
    public onUserRegister(user: any) {
        (new SendWelcomeMail(user)).process()
    }

    @On('onUserCreate')
    public onUserCreate(user: any) {
        console.log('User ' + user.email + ' created!')
    }
}