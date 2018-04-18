module ApplicationHelper
  def print_time(time)
    number_with_precision(time, precision: 2)
  end

  def print_time_in_minutes(time_in_seconds)
    print_time(time_in_seconds / 60.to_f)
  end

  def print_human_time(seconds)
    if seconds < 60
      return "#{seconds} segundos" if seconds != 1
      return "#{seconds} segundo"
    end

    minutes = seconds / 60
    rest_seconds = seconds % 60

    return "#{minutes} minutos e #{rest_seconds} segundos" if minutes != 1

    "#{minutes} minuto e #{rest_seconds} segundos"
  end

  def print_short_time(seconds)
    Time.at(seconds).utc.strftime("%H:%M:%S")
  end

  def letter_option(index)
    return nil if index.nil?

    index = index.to_i

    options = ['A', 'B', 'C', 'D', 'E', 'F']

    options[index]
  end
end
