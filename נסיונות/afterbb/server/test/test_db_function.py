from src.db_function import get_dollar_exchange_rate,get_date  
import datetime


def test_get_dolar_rate():
    result=get_dollar_exchange_rate()
    assert isinstance(result, dict)
    assert "date" in result
    assert "average" in result


def test_get_date():
    current_time = datetime.datetime.now()
    expected_month = current_time.strftime('%B')
    expected_year = str(current_time.year)
    expected_date = expected_month + expected_year

    assert get_date() == expected_date


