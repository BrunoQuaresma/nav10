module ApplicationHelper
  def print_time(time)
    number_with_precision(time, precision: 2)
  end

  def print_time_in_minutes(time_in_seconds)
    print_time(time_in_seconds / 60.to_f)
  end

  def letter_option(index)
    return nil if index.nil?

    index = index.to_i

    options = ['A', 'B', 'C', 'D', 'E', 'F']

    options[index]
  end
end
