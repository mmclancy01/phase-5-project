"""empty message

Revision ID: c948db279468
Revises: c850e12200f8
Create Date: 2024-04-25 16:46:58.135368

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c948db279468'
down_revision = 'c850e12200f8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('courses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tee_times_available', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_courses_tee_times_available_tee_times'), 'tee_times', ['tee_times_available'], ['id'])

    with op.batch_alter_table('tee_times', schema=None) as batch_op:
        batch_op.drop_constraint('fk_tee_times_course_id_courses', type_='foreignkey')
        batch_op.drop_column('course_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tee_times', schema=None) as batch_op:
        batch_op.add_column(sa.Column('course_id', sa.INTEGER(), nullable=False))
        batch_op.create_foreign_key('fk_tee_times_course_id_courses', 'courses', ['course_id'], ['id'])

    with op.batch_alter_table('courses', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_courses_tee_times_available_tee_times'), type_='foreignkey')
        batch_op.drop_column('tee_times_available')

    # ### end Alembic commands ###