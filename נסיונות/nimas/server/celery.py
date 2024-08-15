# from celery import Celery
# from celery.schedules import crontab

# app = Celery('tasks')

# app.conf.beat_schedule = {
#     'run-task-every-month-end': {
#         'task': 'tasks.insert_new_data',
#         'schedule': crontab(day_of_month='last')
#     }
# }
