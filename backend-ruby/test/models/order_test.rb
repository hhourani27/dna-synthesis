require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  test 'Query Order in fixture' do
    order = Order.take
    assert_equal(order.oligos.length, 8 * 12)
  end

  test 'Create Order' do
    order = Order.create!(oligos: %w[A AA AAA AAAA])
    assert_equal(order.oligos.length, 4)
  end

  test 'An Order should always have oligos (empty array)' do
    assert_raises ActiveRecord::RecordInvalid do
      order = Order.create!(oligos: [])
    end
  end

  test 'An Order should always have oligos (nil)' do
    assert_raises ActiveRecord::RecordInvalid do
      order = Order.create!(oligos: nil)
    end
  end

  test 'An Order should always have oligos (no oligos)' do
    assert_raises ActiveRecord::RecordInvalid do
      order = Order.create!
    end
  end
end
