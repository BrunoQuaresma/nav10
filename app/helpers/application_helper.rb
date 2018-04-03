module ApplicationHelper
  def print_time(time)
    number_with_precision(time, precision: 2)
  end

  def print_time_in_minutes(time_in_seconds)
    print_time(time_in_seconds / 60)
  end
end
