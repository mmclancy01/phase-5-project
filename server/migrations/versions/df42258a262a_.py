"""empty message

Revision ID: df42258a262a
Revises: c948db279468
Create Date: 2024-04-25 17:25:10.432716

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'df42258a262a'
down_revision = 'c948db279468'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('teetimes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('course', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.Date(), nullable=False),
    sa.Column('slots_available', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['course'], ['courses.id'], name=op.f('fk_teetimes_course_courses')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('tee_times')
    op.drop_table('course_members')
    op.drop_table('tee_time_slots')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tee_time_slots',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('tee_time_id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('signed_up_at', sa.DATETIME(), nullable=True),
    sa.ForeignKeyConstraint(['tee_time_id'], ['tee_times.id'], name='fk_tee_time_slots_tee_time_id_tee_times'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_tee_time_slots_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('course_members',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('course_id', sa.INTEGER(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], name='fk_course_members_course_id_courses'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_course_members_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tee_times',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('course_id', sa.INTEGER(), nullable=False),
    sa.Column('start_time', sa.DATETIME(), nullable=False),
    sa.Column('slots_available', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], name='fk_tee_times_course_id_courses'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('teetimes')
    # ### end Alembic commands ###